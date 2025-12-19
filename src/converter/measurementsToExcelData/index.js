import _ from "lodash"
import moment from "moment-timezone"
import Excel from "exceljs"

export function MeasurementsToExcelDataConverter() {
    this.toExcelDataAsync = function (measurementsForSingleLocationWithSameGrid, concentrationLabel, fromLabel, toLabel, dateTimeFormat) {
        const result = []
        const pollenNames = new Set()

        _.each(measurementsForSingleLocationWithSameGrid, (mForPolle) => {
            const polleName = _.find(window.pollen, function (p, pName) {
                return pName === mForPolle.polle
            }).name
            pollenNames.add(polleName)

            _.each(mForPolle.data, (d) => {
                const key = d.from + "-" + d.to
                if (result[key] == null) {
                    result[key] = {}
                    result[key][fromLabel]= d.from
                    result[key][toLabel] = d.to
                }
                result[key][polleName] = d.value
            })
        })

        let workbook = new Excel.Workbook();
        const sheet = workbook.addWorksheet(concentrationLabel);
        sheet.columns = [
            { key: fromLabel, width: 20 }, { key: toLabel, width: 20 }
        ].concat(_.map(Array.from(pollenNames), (n) => { return { key: n, width: 20 } }))

        // header row
        _.each(sheet.columns, (c) => { sheet.getRow(1).getCell(c.key).value = c.key; sheet.getRow(1).getCell(c.key).font = { bold: true } })

        let row = 2
        _.each(_.keys(result), (timestamp) => {
            _.each(_.keys(result[timestamp]), (col) => {
                const cell = sheet.getRow(row).getCell(col)

                let value;
                if (col == fromLabel || col == toLabel) {
                    value = moment.tz(result[timestamp][col] * 1000, global.conf.timezone)
                    value = value.add(value.utcOffset(), 'minutes').toDate()
                    cell.numFmt = dateTimeFormat
                } else {
                    value = result[timestamp][col]
                }

                cell.value = value
            })
            row++
        })

        return new Promise((resolve, reject) => {
            workbook.xlsx.writeBuffer().then((b) => {
                var base64String = b.toString("base64")
                const dataUrl = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + base64String
                resolve(dataUrl)
            })
        })
    }
}