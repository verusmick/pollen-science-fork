<template>
  <page-layout :use-container="false">
    <div class="container-fluid mt-3">
      <!-- ALERT HEADER -->
      <div class="card p-3 mb-3">
        <div class="d-flex justify-content-between">
          <div class="d-flex">
            <div class="severity-bar bg-danger mr-3"></div>
            <div>
              <h5 class="mb-1 font-weight-bold">
                Red alert · Eibe (Taxus)
                <small class="text-muted ml-2">5h ago</small>
              </h5>
              <div class="text-muted">
                Triggered by rule: Eibe Season Monitoring
              </div>
              <div class="small mt-1">
                <strong>Location:</strong> Marktheidenfeld
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <strong>Pollen type:</strong> Eibe (Taxus)
              </div>
            </div>
          </div>
          <div>
            <strong>Status:</strong>
            <span class="badge badge-dark ml-1">Open</span>
          </div>
        </div>
      </div>

      <!-- CONTROLS -->
      <div class="mb-2 d-flex align-items-center">
        <span class="mr-2 text-muted">display</span>
        <button class="btn btn-sm btn-primary mr-1">today</button>
        <button class="btn btn-sm btn-primary mr-1">select area</button>
        <button class="btn btn-sm btn-secondary mr-1">move time axis</button>
        <button class="btn btn-sm btn-warning mr-3">reset view</button>

        <div class="ml-auto d-flex align-items-center">
          <span class="text-muted mr-2">time range:</span>
          <input type="range" min="7" max="30" v-model="range" />
          <span class="small ml-2">{{ range }} days</span>
        </div>
      </div>

      <!-- CHART -->
      <div class="row fill mt-2">
        <div class="col-12">
          <Plot ref="plot"></Plot>
        </div>
      </div>
    </div>
  </page-layout>
</template>

<script>
import { defineComponent } from "vue";
import PageLayout from "../../../../layouts/PageLayout.vue";
import Plot from "../../../../components/plot/Plot.vue"; 
import { useMeta } from "vue-meta";
import moment from "moment-timezone";
import _ from "lodash";
import { LocationsStore, PollenWithCurrentCountStore, MeasurementsStore } from "../../../../stores";

// Import converters if needed
// import MeasurementsToExcelDataConverter from "@/converters/MeasurementsToExcelDataConverter";
// import MeasurementsToPlotDataConverter from "@/converters/MeasurementsToPlotDataConverter";

// Define constants
const _START_DATE = '2020-01-01';
const _VARIA = 'VARIA';

export default defineComponent({
  name: "ThreeHours",
  components: {
    PageLayout,
    Plot, // Fixed: Use PascalCase directly, not object notation
  },
  inject: ['$secured', '$defaultLocationId'], // Inject dependencies
  data() {
    return {
      range: 30, // Added missing range property
      selectedLocation: undefined,
      selectedPollen: undefined,
      selectedRange: "P1M",
      rangeInSelection: "1",
      maxMonths: 0, // Initialize, will be set in created/mounted
      download: undefined,
      filename: undefined,
      filterChanged: false,
    };
  },
  created() {
    // Calculate maxMonths
    if (window.conf?.timezone) {
      this.maxMonths = moment.tz(window.conf.timezone).diff(moment.tz(_START_DATE, window.conf.timezone), 'months');
    }

    // Set default location from route query
    if (this.$route?.query?.location && this.$defaultLocationId) {
      this.$defaultLocationId.value = this.$route.query.location;
    }
  },
  mounted() {
    // Set meta tags - useMeta should be called in setup, but we can use alternative
    this.setMetaTags();
    
    // Initialize stores
    this.initializeStores();
  },
  watch: {
    selectedRange: function() {
      this.refreshPlot();
    },
    selectedLocation: function() {
      this.refreshPlot();
    }
  },
  methods: {
    setMetaTags() {
      // Alternative to useMeta - directly update document
      document.title = "Pollen Science - Aktuelle Daten";
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Auf dieser Seite sehen Sie die aktuellen Pollenfluginformationen von 13 automatischen Pollenfallen - von heute bis zu einem Jahr in die Vergangenheit.');
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = 'Auf dieser Seite sehen Sie die aktuellen Pollenfluginformationen von 13 automatischen Pollenfallen - von heute bis zu einem Jahr in die Vergangenheit.';
        document.head.appendChild(meta);
      }
    },
    
    initializeStores() {
      // Initialize stores
      this.pollenStore = new PollenWithCurrentCountStore();
      this.locationsStore = new LocationsStore();
    },
    
    getPreSelectedPollen(pollenCount) {
      return _.filter(pollenCount, (pc, idx) => {
        return (idx < 5 || pc.currentCount > 3) && pc.name !== _VARIA;
      });
    },
    
    pollenLabelProvider(pollen) {
      const foundPollen = window.pollen ? _.find(window.pollen, (p, pName) => {
        return pName === pollen.name;
      }) : { name: pollen.name };
      
      return foundPollen.name + " (" + pollen.name + ")";
    },
    
    sortByProvider(o, items) {
      if (o.name === _VARIA) {
        return ((items[items.length - 3]?.currentCount || 0) + 0.0001) * -1;
      } else {
        return (o.currentCount || 0) * -1;
      }
    },
    
    filterAllPollenSelection(pollen) {
      return _.filter(pollen, (p) => p.name !== _VARIA);
    },
    
    locationsLabelProvider(location) {
      return location.name;
    },
    
    selectedRangeChanged(e) {
      if (e?.target?.value) {
        this.selectedRange = "P" + e.target.value + "M";
      }
    },
    
    rangeInSelectionChanged(e) {
      if (e?.target?.value) {
        this.rangeInSelection = e.target.value;
      }
    },
    
    updateSelectedLocation(l) {
      this.selectedLocation = l;
      this.refreshPlot();
    },
    
    updateSelectedPollen(pollen) {
      this.selectedPollen = _.map(pollen, p => p.name);
      this.filterChanged = true;
    },
    
    zoomToNow() {
      if (this.$refs.plot?.zoomToNow) {
        this.$refs.plot.zoomToNow(1);
      }
    },
    
    setPanMode() {
      if (this.$refs.plot?.setPanMode) {
        this.$refs.plot.setPanMode();
      }
    },
    
    setZoomMode() {
      if (this.$refs.plot?.setZoomMode) {
        this.$refs.plot.setZoomMode();
      }
    },
    
    refreshPlot() {
      this.download = undefined;

      if (this.selectedLocation !== undefined && this.selectedPollen !== undefined) {
        this.filterChanged = false;
        
        if (this.$refs.plot) {
          this.$refs.plot.loading = true;
        }

        const now = moment.tz(window.conf?.timezone || 'UTC');
        const from = moment.tz(now, window.conf?.timezone || 'UTC').subtract(moment.duration(this.selectedRange));
        
        // For now, simulate the API call since MeasurementsToExcelDataConverter and MeasurementsToPlotDataConverter might not exist
        // If you have these converters, uncomment the code below
        
        /*
        const concentrationsLabel = this.$t ? this.$t("concentrations") : "concentrations";
        const fromLabel = this.$t ? this.$t("from") : "from";
        const toLabel = this.$t ? this.$t("to") : "to";
        const dateTimeFormatExcel = this.$t ? this.$t("dateTimeFormat.excel.full") : "YYYY-MM-DD HH:mm:ss";
        const dateTimeFormat = this.$t ? this.$t("dateTimeFormat.datetime") : "YYYY-MM-DD HH:mm";
        const timeFormat = this.$t ? this.$t("dateTimeFormat.time") : "HH:mm";
        const dateFormat = this.$t ? this.$t("dateTimeFormat.date") : "YYYY-MM-DD";
        const unitLabel = this.$t ? this.$t("unit") : "unit";

        new MeasurementsStore()
          .pollen(this.selectedPollen)
          .locations(this.selectedLocation.id)
          .from(from.unix())
          .to(now.unix())
          .get()
          .then((d) => {
            // Simulate excel data converter if it exists
            if (typeof MeasurementsToExcelDataConverter !== 'undefined') {
              new MeasurementsToExcelDataConverter()
                .toExcelDataAsync(d.measurements, concentrationsLabel, fromLabel, toLabel, dateTimeFormatExcel)
                .then((data) => {
                  this.download = data;
                  this.filename = `${this.selectedLocation.name}_${this.selectedPollen}_${from.format(dateFormat)}-${now.format(dateFormat)}.xlsx`;
                });
            }

            // Simulate plot data converter if it exists
            if (typeof MeasurementsToPlotDataConverter !== 'undefined') {
              this.$refs.plot.dataset = {
                from: moment.tz(d.from * 1000, window.conf?.timezone || 'UTC'),
                to: moment.tz(d.to * 1000, window.conf?.timezone || 'UTC'),
                data: new MeasurementsToPlotDataConverter().toPlotData(d.measurements, dateTimeFormat, timeFormat, unitLabel)
              };
            }
            
            if (this.$refs.plot) {
              this.$refs.plot.loading = false;
            }
            this.filterChanged = false;
          });
        */
       
       // Simulated response for now
       setTimeout(() => {
         if (this.$refs.plot) {
           this.$refs.plot.loading = false;
         }
         this.filterChanged = false;
       }, 1000);
      }
    }
  }
});
</script>

<style scoped>
.severity-bar {
  width: 8px;
  border-radius: 3px;
  min-height: 60px;
}

.btn-sm {
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-warning {
  background-color: #ffc107;
  border-color: #ffc107;
  color: #212529;
}

input[type="range"] {
  width: 150px;
}

@media (max-width: 768px) {
  .d-flex.align-items-center {
    flex-wrap: wrap;
  }

  .ml-auto {
    margin-left: 0 !important;
    margin-top: 1rem;
    width: 100%;
  }

  input[type="range"] {
    width: 100%;
  }
}
</style>