import PageLayout from "./../../layouts/PageLayout.vue";
import _ from "lodash";
import Dropdown from "./../../components/form/dropdown/Dropdown.vue";
import { PollenStore, LocationsStore, SeasonsStore } from "../../stores";
import moment from "moment-timezone";
import { useMeta } from "vue-meta";

export default {
  name: "RulesAndNotifications",
  components: {
    "page-layout": PageLayout,
    dropdown: Dropdown,
  },
  created() {
    useMeta({
      title: "Pollen Science - Regeln und Benachrichtigungen",
      meta: [
        // { "name": "description", "content": "In der Statistik finden Sie zu einem Ort und zu einer Pollenart jeweils Anfang, Höhepunkt und Ende des Pollenfluges sowie die insgesamt in diesem Jahr gezählte Pollenanzahl pro Kubikmeter. Dies ermöglicht speziell den Vergleich zwischen den Jahren." }
      ],
    });
  },
  data: () => {
    const preSelectedPollen = [
      "Corylus",
      "Alnus",
      "Fraxinus",
      "Betula",
      "Poaceae",
      "Artemisia",
      "Ambrosia",
    ];

    return {
      selectedLocation: undefined,
      selectedPollen: undefined,
      stats: undefined,

      pollenStore: new PollenStore(),
      pollenLabelProvider: function (pollen) {
        return (
          _.find(window.pollen, function (p, pName) {
            return pName === pollen;
          }).name +
          " (" +
          pollen +
          ")"
        );
      },
      sortByProvider: function (o) {
        const name = _.find(window.pollen, function (p, pName) {
          return pName === o;
        }).name;

        if (preSelectedPollen.indexOf(o) >= 0) {
          return "AAA" + name;
        } else {
          return name;
        }
      },

      locationsStore: new LocationsStore(),
      locationsLabelProvider: function (location) {
        return location.name;
      },
    };
  },
  computed: {
    hasStats: function () {
      return this.stats && _.keys(this.stats).length > 0;
    },
  },
  methods: {
    updateSelectedLocation: function (l) {
      this.selectedLocation = l;
      this.refreshStats();
    },
    updateSelectedPollen: function (pollen) {
      this.selectedPollen = pollen;
      this.refreshStats();
    },
    refreshStats: function () {
      if (!!this.selectedLocation && !!this.selectedPollen) {
        new SeasonsStore()
          .getStatistics(this.selectedLocation.id, this.selectedPollen)
          .then((stats) => (this.stats = stats.statistics));
      }
    },
    timestampToString: function (timestamp) {
      if (!!timestamp) {
        return moment.tz(timestamp * 1000, global.conf.timezone).format("LL");
      } else {
        return "";
      }
    },
  },
  inject: ["$defaultLocationId"],
};
