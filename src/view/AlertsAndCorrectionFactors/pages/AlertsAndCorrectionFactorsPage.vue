<template>
  <page-layout :use-container="false">
    <div class="container-fluid mt-3">
      <!-- Tabs -->
      <ul class="nav nav-tabs mb-3">
        <li class="nav-item">
          <a class="nav-link" :class="{ active: activeTab === 'alerts' }" @click="setActiveTab('alerts')" href="#">
            Alerts
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{ active: activeTab === 'correctionFactors' }"
            @click="setActiveTab('correctionFactors')" href="#">
            Correction Factors
          </a>
        </li>
      </ul>

      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Alerts Tab -->
        <div v-show="activeTab === 'alerts'" class="tab-pane fade" :class="{ 'show active': activeTab === 'alerts' }">
          <AlertsListPage />
        </div>

        <!-- Correction Factors Tab -->
        <div v-show="activeTab === 'correctionFactors'" class="tab-pane fade"
          :class="{ 'show active': activeTab === 'correctionFactors' }">
          <CorrectionFactorsListPage />
           <!-- <AlertDetailsPage/> -->
        </div>
      </div>
    </div>
  </page-layout>

</template>
<script>
import PageLayout from "../../../layouts/PageLayout.vue";
import AlertDetailsPage from "../alerts/pages/AlertDetailsPage.vue";
import AlertsListPage from "../alerts/pages/AlertsListPage.vue";
import CorrectionFactorsListPage from "../correction-factors/pages/CorrectionFactorsListPage.vue";

export default {
  name: "AlertsAndCorrectionFactorsPage",
  components: {
    PageLayout,
    AlertsListPage,
    CorrectionFactorsListPage,
    AlertDetailsPage
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

</script>
<style scoped>
.alert-list {
  max-height: 75vh;
  overflow-y: auto;
}
</style>