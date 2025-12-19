import {inject} from 'vue';
import PageLayout from "./../../layouts/PageLayout.vue"
import Plot from './../../components/plot/Plot.vue'
import _ from "lodash"
import { MeasurementsStore, LocationsStore, PollenStore, PollenWithCurrentCountStore } from './../../stores'
import { MeasurementsToPlotDataConverter } from './../../converter/measurementsToPlotData'
import Dropdown from './../../components/form/dropdown/Dropdown.vue'
import moment from 'moment-timezone'
import { MeasurementsToExcelDataConverter } from '../../converter/measurementsToExcelData'

import { defineComponent } from "vue";
import {useMeta} from "vue-meta";

const _VARIA = "Varia"
const _START_DATE = "2018-04-01"

export default defineComponent({
  name: "ThreeHours",
  components: {
    "page-layout": PageLayout,
    "plot": Plot,
    "dropdown": Dropdown
  },
  created() {
    useMeta({
      title: "Pollen Science - Aktuelle Daten",
      meta: [
        { "name": "description", "content": "Auf dieser Seite sehen Sie die aktuellen Pollenfluginformationen von 13 automatischen Pollenfallen - von heute bis zu einem Jahr in die Vergangenheit." }
      ]
    });

    // set default location
    if (this.$route.query.location) {
      const defaultLocationId = inject('$defaultLocationId');
      defaultLocationId.value = this.$route.query.location;
    }
  },
  data: () => {
    return {
      selectedLocation: undefined,
      selectedPollen: undefined,
      selectedRange: "P1M",
      rangeInSelection: "1",
      maxMonths: moment.tz(global.conf.timezone).diff(moment.tz(_START_DATE, global.conf.timezone), 'months'),
      download: undefined,
      filename: undefined,
      filterChanged: false,

      getPreSelectedPollen: function (pollenCount) {
        return _.filter(pollenCount, (pc, idx) => {
          return (idx < 5 || pc.currentCount > 3) && pc.name !== _VARIA
        })
      },

      pollenStore: new PollenWithCurrentCountStore(),
      pollenLabelProvider: function (pollen) {
        return _.find(window.pollen, function (p, pName) {
          return pName === pollen.name
        }).name + " (" + pollen.name + ")"
      },
      sortByProvider: function (o, items) {
        if (o.name === _VARIA) {
          return (items[items.length - 3].currentCount + 0.0001) * -1
        } else {
          return o.currentCount * -1
        }
      },
      filterAllPollenSelection: function (pollen) {
        return _.filter(pollen, (p) => p.id.name !== _VARIA)
      },

      locationsStore: new LocationsStore(),
      locationsLabelProvider: function (location) {
        return location.name
      }
    }
  },
  watch: {
    selectedRange: function () {
      this.refreshPlot()
    }
  },
  methods: {
    selectedRangeChanged: function (e) {
      if (!!e && !!e.target && e.target.value) {
        this.selectedRange = "P" + e.target.value + "M"
      }
    },
    rangeInSelectionChanged: function (e) {
      if (!!e && !!e.target && e.target.value) {
        this.rangeInSelection = e.target.value
      }
    },
    updateSelectedLocation: function (l) {
      this.selectedLocation = l
      this.refreshPlot()
    },
    updateSelectedPollen: function (pollen) {
      this.selectedPollen = _.map(pollen, p => p.name)
      this.filterChanged = true;
    },
    zoomToNow: function () {
      this.$refs.plot.zoomToNow(1)
    },
    setPanMode: function () {
      this.$refs.plot.setPanMode()
    },
    setZoomMode: function () {
      this.$refs.plot.setZoomMode()
    },
    refreshPlot: function () {
      this.download = undefined
      
      if (this.selectedLocation !== undefined && this.selectedPollen !== undefined) {
        this.filterChanged = false
        this.$refs.plot.loading = true

        const now = moment.tz(global.conf.timezone)
        const from = moment.tz(now, global.conf.timezone).subtract(moment.duration(this.selectedRange))
        const concentrationsLabel = this.$t("concentrations")
        const fromLabel = this.$t("from")
        const toLabel = this.$t("to")
        const dateTimeFormatExcel = this.$t("dateTimeFormat.excel.full")
        const dateTimeFormat = this.$t("dateTimeFormat.datetime")
        const timeFormat = this.$t("dateTimeFormat.time")
        const dateFormat = this.$t("dateTimeFormat.date")
        const unitLabel = this.$t("unit")

        new MeasurementsStore().pollen(this.selectedPollen).locations(this.selectedLocation.id).from(from.unix()).to(now.unix()).get().then(_.bind((d) => {
          new MeasurementsToExcelDataConverter().toExcelDataAsync(d.measurements, concentrationsLabel, fromLabel, toLabel, dateTimeFormatExcel).then((data) => {
            this.download = data
            this.filename = this.selectedLocation.name + "_" + this.selectedPollen + "_" + from.format(dateFormat)  + "-" + now.format(dateFormat) + ".xlsx"
          })

          this.$refs.plot.dataset = {
            from: moment.tz(d.from * 1000, global.conf.timezone),
            to: moment.tz(d.to * 1000, global.conf.timezone),
            data: new MeasurementsToPlotDataConverter().toPlotData(d.measurements, dateTimeFormat, timeFormat, unitLabel)
          }
          this.$refs.plot.loading = false
          this.filterChanged = false
        }, this))
      }
    }
  },
  inject: ['$secured', '$defaultLocationId'],
})