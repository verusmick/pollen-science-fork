import _ from "lodash"
import moment, { now } from "moment-timezone"

import Plotly from "plotly.js"
import locale from "plotly.js-locales/de"

import { useI18n } from "vue-i18n";


import { defineComponent, ref, computed, onMounted, watch } from "vue";


export default defineComponent({
  name: "Plot",
  components: {},
  setup() {
    const { t } = useI18n();
    return {
      t
    }
  },
  data: () => {
    return {
      loading: false,
      dataset: undefined,
      layout: {
        margin: {
          l: 50,
          r: 20,
          b: 50,
          t: 20,
          pad: 0
        },
        yaxis: {
          rangemode: "nonnegative",
          title: {
            text: "Pollen / m³"
          }
        },
        xaxis: {
          range: [moment().subtract(moment.duration("P3M")).toDate(), moment().toDate()]
        },
        modebar: {
          bgcolor: "#ff0000"
        },
        hovermode: "closest",
        dragmode: "zoom",
        plot_bgcolor: '#ebebeb',
        legend: {
          x: 0,
          y: 1,
          bordercolor: "#0062cc",
          borderwidth: 2,
          orientation: "h",
          itemclick: false,
          itemdoubleclick: false
        }
      }
    }
  },
  watch: {
    dataset: function () {
      let viewInterval = this.dataset.to.diff(this.dataset.from)
      let paddingRight = viewInterval * 0.05

      this.layout.xaxis.range = [this.dataset.from.toDate(), moment.tz(this.dataset.to, global.conf.timezone).add(paddingRight, "milliseconds").toDate()]

      delete this.layout.yaxis.range
      this.layout.yaxis.autorange = true

      let maxY = _.reduce(this.dataset.data, (currentMax, currentData) => {
        const currentDataMax = _.max(currentData.y)
        return (currentMax > currentDataMax) ? currentMax : currentDataMax
      }, 0)

      const _now = moment.tz(global.conf.timezone)
      const todayString = this.$t('today');

      this.layout.shapes = [
        {
          type: 'rectangle',
          x0: _now.startOf("day").toDate(),
          y0: 0,
          x1: _now.endOf("day").toDate(),
          y1: maxY,
          layer: "below",
          fillcolor: "#0062cc",
          opacity: 0.3,
          line: {
            width: 0
          }
        },
        {
          type: 'line',
          x0: this.dataset.from.toDate(),
          y0: 30,
          x1: moment.tz(this.dataset.to, global.conf.timezone).add(paddingRight, "milliseconds").toDate(),
          y1: 30,
          layer: 'below',
          line: {
            width: 2,
            dash: 'dot',
            color: 'green'
          }
        }
        ,
        {
          type: 'line',
          x0: this.dataset.from.toDate(),
          y0: 100,
          x1: moment.tz(this.dataset.to, global.conf.timezone).add(paddingRight, "milliseconds").toDate(),
          y1: 100,
          layer: 'above',
          line: {
            width: 2,
            dash: 'dot',
            color: 'red'
          }
        }
      ]

      this.layout.annotations = [
        {
          x: _now.toDate(),
          y: maxY * 0.9,
          xref: 'x',
          yref: 'y',
          text: todayString,
          showarrow: true,
          arrowhead: 7,
          ax: 30,
          ay: 0
        }
      ]

      this.refreshPlot()
    }
  },
  methods: {
    refreshPlot: function () {
      Plotly.react(this.$refs.plot, this.dataset.data, this.layout)
    },
    setPanMode: function () {
      this.layout.dragmode = "pan"
      Plotly.relayout(this.$refs.plot, this.layout)
    },
    setZoomMode: function () {
      this.layout.dragmode = "zoom"
      Plotly.relayout(this.$refs.plot, this.layout)
    },
    zoomToNow: function(dayCountBack) {
      const oneDayBeforeLatest = moment.tz(this.dataset.to, global.conf.timezone).subtract(dayCountBack, "day")
      const endOfToday = moment.tz(this.dataset.to, global.conf.timezone).endOf("day")

      const viewInterval = endOfToday.diff(oneDayBeforeLatest)
      const paddingRight = viewInterval * 0.05

      let maxY = _.reduce(this.dataset.data, (currentMax, currentData) => {
        const relevantYs = []

        for (let i = 0; i < currentData.x.length; i++) {
          if (moment.tz(currentData.x[i], global.conf.timezone).isAfter(oneDayBeforeLatest)) {
            relevantYs.push(currentData.y[i])
          }
        }
      
        const currentDataMax = _.max(relevantYs)
        return (currentMax > currentDataMax) ? currentMax : currentDataMax
      }, 0)
      
      this.layout.xaxis.range = [oneDayBeforeLatest.toDate(), endOfToday.add(paddingRight, "milliseconds").toDate()]
      this.layout.yaxis.range = [0, maxY * 1.1]
      delete this.layout.yaxis.autorange
      
      this.refreshPlot()
    }
  },
  mounted: function () {
    Plotly.register(locale)
    Plotly.setPlotConfig({ locale: 'de', displayModeBar: false, showTips: false, responsive: true })
  }
})