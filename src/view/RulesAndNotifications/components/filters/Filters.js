import { defineComponent } from "vue";
import SearchInput from "../../../../components/ui/searchInput/SearchInput.vue";
import SelectInput from "../../../../components/ui/selectInput/SelectInput.vue";

export default defineComponent({
  name: "Filters",

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
