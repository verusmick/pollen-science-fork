import AlertCard from "./components/alertCard/AlertCard.vue";
import FilterBar from "./components/filterBar/FilterBar.vue";

export default {
  name: "AlertsList",
  components: {
    AlertCard,
    FilterBar,
  },
  props: {},
  data() {
    return {
      alerts: [
        {
          id: 1,
          severity: "red",
          pollenType: "Birch",
          pollenCount: 247,
          station: "Hof",
          rule: "Birch Season Monitoring",
          time: "2h ago",
          status: "Resolved",
          correction: true,
        },
        {
          id: 2,
          severity: "yellow",
          pollenType: "Grass",
          pollenCount: 132,
          station: "Feucht",
          rule: "Grass Peak Season Monitoring",
          time: "6h ago",
          status: "Open",
          correction: false,
        },
        {
          id: 3,
          severity: "green",
          pollenType: "Mould",
          pollenCount: 23,
          station: "Feucht",
          rule: "Mould Activity Watch",
          time: "2d ago",
          status: "Resolved",
          correction: true,
        },
      ],
      filters: {
        severity: "",
        status: "",
        pollenType: "",
        station: "",
        searchQuery: "",
        dateRange: {
          start: null,
          end: null,
        },
      },
      filteredAlerts: [],
    };
  },
};
