<template>
  <div class="filters-container">
    <div class="row align-items-center">
      <!-- Search -->
      <div class="col-md-4">
        <search-input v-model="query" placeholder="Rule Name" @search="applyFilters" />
      </div>

      <!-- Pollen Type -->
      <div class="col-md-2">
        <select-input v-model="selectedType" :options="typeOptions" placeholder="Pollen type" allow-empty
          empty-label="All" @change="applyFilters" />
      </div>

      <!-- Station -->
      <div class="col-md-2">
        <select-input v-model="selectedStation" :options="stationOptions" placeholder="Station" allow-empty
          empty-label="All" @change="applyFilters" />
      </div>

      <!-- Status -->
      <div class="col-md-2">
        <select-input v-model="selectedStatus" :options="statusOptions" placeholder="Status" allow-empty
          empty-label="All" @change="applyFilters" />
      </div>

      <!-- Reset Button -->
      <div class="col-md-2 text-right">
        <button class="btn btn-primary btn-sm" @click="resetFilters">
          Reset Filters
        </button>
      </div>
    </div>
  </div>

</template>
<script>
import { defineComponent } from "vue";
import SearchInput from "../../../../components/ui/searchInput/SearchInput.vue";
import SelectInput from "../../../../components/ui/selectInput/SelectInput.vue";

export default defineComponent({
  name: "AlertsFiltersSection",

  components: {
    SearchInput,
    SelectInput,
  },

  data() {
    return {
      query: "",

      selectedType: null,
      selectedStation: null,
      selectedStatus: null,

      typeOptions: [
        { label: "Pollen", value: "Pollen" },
        { label: "Dust", value: "Dust" },
        { label: "Mold", value: "Mold" },
      ],

      stationOptions: [
        { label: "Station A", value: "A" },
        { label: "Station B", value: "B" },
      ],

      statusOptions: [
        { label: "Active", value: "active" },
        { label: "Resolved", value: "resolved" },
      ],
    };
  },

  methods: {
    applyFilters() {
      const filters = {
        query: this.query,
        type: this.selectedType,
        station: this.selectedStation,
        status: this.selectedStatus,
      };

      console.log("Applying filters:", filters);
      // emit / API call here
    },

    resetFilters() {
      this.query = "";
      this.selectedType = null;
      this.selectedStation = null;
      this.selectedStatus = null;

      this.applyFilters();
    },
  },
});

</script>
<style scoped>
.filters-container {
  display: flex;
  background-color: #f8f9fa;
  width: 100%;
  padding: 0.3em 1.5em;
}
</style>