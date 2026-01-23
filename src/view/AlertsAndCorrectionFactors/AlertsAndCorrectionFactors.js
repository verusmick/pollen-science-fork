import PageLayout from "./../../layouts/PageLayout.vue";
import AlertsList from "./alerts/Alerts.vue";
import CorrectionFactorsList from "./correctionFactors/CorrectionFactors.vue";
export default {
  name: "AlertsAndCorrectionFactorsPage",
  components: {
    PageLayout,
    AlertsList,
    CorrectionFactorsList,
  },

  data() {
    return {
      activeTab: "alerts", // Default active tab
    };
  },
  methods: {
    setActiveTab(tabName) {
      this.activeTab = tabName;
    },
  },
  // Optional: Handle browser back/forward for tab state
  mounted() {
    // Check URL hash for tab selection
    const hash = window.location.hash;
    if (hash === "#correction-factors") {
      this.activeTab = "correctionFactors";
    } else if (hash === "#alerts") {
      this.activeTab = "alerts";
    }
  },
  watch: {
    activeTab(newTab) {
      // Update URL hash when tab changes (optional)
      const hash =
        newTab === "correctionFactors" ? "#correction-factors" : "#alerts";
      window.history.pushState(null, null, hash);
    },
  },
};
