import RuleItem from "../ruleItem/RuleItem.vue";

export default {
  name: "RuleList",
  components: {
    RuleItem,
  },
  data() {
    return {
      // Sample data from your screenshot
      rules: [
        {
          id: "1",
          title: "Off-Season Birch Detection",
          description:
            "Notifies when Birch pollen is detected outside its typical spring season window.",
          isActive: true,
          pollenType: "Birch",
          actionType: "Alerting",
          stations: ["Feucht"],
          seasonStart: "Mar 01",
          seasonEnd: "Jun 30",
        },
        {
          id: "2",
          title: "Grass Peak Season Monitoring",
          description:
            "Alerts if Grass pollen exceeds normal levels during the high-risk summer months.",
          isActive: true,
          pollenType: "Grass",
          actionType: "Monitoring",
          stations: ["Höfl"],
          seasonStart: "Feb 01",
          seasonEnd: "Dec 30",
        },
        {
          id: "3",
          title: "Mould Activity Watch",
          description:
            "Monitors Schimmel/Moulds counts and alerts when concentrations surpass predefined safety levels.",
          isActive: true,
          pollenType: "Mould",
          actionType: "Alerting",
          stations: ["Viechtach", "Höfl"],
          seasonStart: "Dec 01",
          seasonEnd: "Jul 02",
        },
        {
          id: "4",
          title: "Seasonal Pollen Threshold Rule",
          description:
            "Notifies when selected pollen type exceeds configured alert thresholds during the defined season.",
          isActive: true,
          pollenType: "Birch",
          actionType: "Threshold",
          stations: ["Garmisch"],
          seasonStart: "May 06",
          seasonEnd: "Dec 03",
        },
        {
          id: "5",
          title: "Off-Season Birch Detection",
          description:
            "Notifies when Birch pollen is detected outside its typical spring season window.",
          isActive: false,
          pollenType: "Birch",
          actionType: "Alerting",
          stations: ["Garmisch", "Höfl"],
          seasonStart: "Mar 01",
          seasonEnd: "Jun 30",
        },
      ],
      searchQuery: "",
      selectedType: "",
      filteredRules: [],
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    activeRulesCount() {
      return this.rules.filter((rule) => rule.isActive).length;
    },
    birchCount() {
      return this.rules.filter((rule) => rule.pollenType === "Birch").length;
    },
    grassCount() {
      return this.rules.filter((rule) => rule.pollenType === "Grass").length;
    },
    mouldCount() {
      return this.rules.filter((rule) => rule.pollenType === "Mould").length;
    },
    totalPages() {
      return Math.ceil(this.filteredRules.length / this.itemsPerPage);
    },
  },
  created() {
    this.filteredRules = [...this.rules];
  },
  methods: {
    filterRules() {
      let filtered = [...this.rules];

      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (rule) =>
            rule.title.toLowerCase().includes(query) ||
            rule.description.toLowerCase().includes(query) ||
            rule.stations.some((station) =>
              station.toLowerCase().includes(query)
            )
        );
      }

      // Filter by pollen type
      if (this.selectedType) {
        filtered = filtered.filter(
          (rule) => rule.pollenType === this.selectedType
        );
      }

      this.filteredRules = filtered;
      this.currentPage = 1; // Reset to first page when filtering
    },

    clearFilters() {
      this.searchQuery = "";
      this.selectedType = "";
      this.filteredRules = [...this.rules];
    },

    handleToggle(id, isActive) {
      const ruleIndex = this.rules.findIndex((rule) => rule.id === id);
      if (ruleIndex !== -1) {
        this.rules[ruleIndex].isActive = isActive;
        console.log(`Rule ${id} toggled to ${isActive ? "On" : "Off"}`);

        // Update filtered rules
        const filteredIndex = this.filteredRules.findIndex(
          (rule) => rule.id === id
        );
        if (filteredIndex !== -1) {
          this.filteredRules[filteredIndex].isActive = isActive;
        }
      }
    },

    handleEdit(rule) {
      console.log("Edit rule:", rule);
      // You can implement edit functionality here
      // this.$emit('edit-rule', rule)
    },

    addNewRule() {
      console.log("Add new rule clicked");
      // You can implement add functionality here
      // this.$emit('add-rule')
    },

    goToPage(page) {
      this.currentPage = page;
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
};
