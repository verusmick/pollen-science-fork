import _ from "lodash"
import moment from "moment-timezone"

export function MeasurementsToPlotDataConverter() {

    this.toPlotData = function (measurementsForSingleLocation, dateTimeFormat, timeFormat, unitLabel) {
        return _.map(measurementsForSingleLocation, (mForPolle) => {
            const name = _.find(window.pollen, function (p, pName) {
                return pName === mForPolle.polle
            }).name

            return {
                mode: "lines+markers",
                line: {
                    dash: 'line',
                    width: 1
                },
                marker: {
                    size: 5
                },
                name: name,
                x: _.map(mForPolle.data, (d) => {
                    const from = moment.tz(d.from * 1000, global.conf.timezone)
                    const to = moment.tz(d.to * 1000, global.conf.timezone)
                    const halfDiffMillis = to.diff(from) / 2
                    
                    return from.add(halfDiffMillis, "milliseconds").toDate()
                }),
                y: _.map(mForPolle.data, (d) => {
                    return d.value
                }),
                customdata: _.map(mForPolle.data, (d) => {
                    const from = moment.tz(d.from * 1000, global.conf.timezone)
                    const to = moment.tz(d.to * 1000, global.conf.timezone)

                    return name + "<br />" + from.format(dateTimeFormat) + " - " + to.format(timeFormat)
                }),
                hovertemplate: '%{customdata} <br />%{y:.0f} ' + unitLabel + '<extra></extra>'
            }
        })
    }
}