import FilterBar from "./components/filterBar/FilterBar.vue";

export default {
  name: "CorrectionFactors",
  components: {
    FilterBar,
  },
  data() {
    return {
      filters: {
        id: "",
        pollenType: "",
        station: "",
        status: "",
      },
      correctionFactors: [
        {
          id: "0012",
          name: "2nd Correction Factor #0012",
          location: "Marktheidenfeld",
          pollens: ["Eibe (Taxus)", "Grass"],
          dateRange: "Nov 25 - Dec 4, 2025",
          status: "active",
          createdDate: "Nov 24, 2025",
          modifiedDate: "Nov 25, 2025",
          additionalInfo: "Applied for extreme weather conditions",
        },
        {
          id: "0017",
          name: "2nd Correction Factor #0017",
          location: "Marktheidenfeld",
          pollens: ["Grass"],
          dateRange: "Nov 1 - Dec 25, 2025",
          status: "active",
          createdDate: "Oct 30, 2025",
          modifiedDate: null,
          additionalInfo: "Seasonal adjustment factor",
        },
        {
          id: "0018",
          name: "Correction Factor #0018",
          location: "Feucht",
          pollens: ["Birch", "Mould"],
          dateRange: "Mar 1 - Apr 30, 2026",
          status: "pending",
          createdDate: "Feb 28, 2026",
          modifiedDate: null,
          additionalInfo: "Spring season calibration",
        },
      ],
    };
  },
  computed: {
    filteredFactors() {
      return this.correctionFactors.filter((factor) => {
        // Filter by ID
        if (this.filters.id && !factor.id.includes(this.filters.id)) {
          return false;
        }

        // Filter by pollen type
        if (this.filters.pollenType) {
          const hasPollen = factor.pollens.some((pollen) =>
            pollen
              .toLowerCase()
              .includes(this.filters.pollenType.toLowerCase()),
          );
          if (!hasPollen) return false;
        }

        // Filter by station/location
        if (
          this.filters.station &&
          !factor.location
            .toLowerCase()
            .includes(this.filters.station.toLowerCase())
        ) {
          return false;
        }

        // Filter by status
        if (this.filters.status && factor.status !== this.filters.status) {
          return false;
        }

        return true;
      });
    },
  },
  methods: {
    getPollenColor(pollen) {
      const colorMap = {
        Birch: "primary",
        Grass: "success",
        "Eibe (Taxus)": "info",
        Mould: "warning",
      };

      // Find the key that matches
      for (const [key, color] of Object.entries(colorMap)) {
        if (pollen.includes(key)) {
          return color;
        }
      }
      return "secondary";
    },

    getStatusClass(status) {
      const statusMap = {
        active: "success",
        inactive: "secondary",
        pending: "warning",
      };
      return statusMap[status] || "secondary";
    },

    resetFilters() {
      this.filters = {
        id: "",
        pollenType: "",
        station: "",
        status: "",
      };
    },

    editFactor(factor) {
      console.log("Edit factor:", factor);
      this.$emit("edit-factor", factor);
    },

    toggleFactorStatus(factor) {
      factor.status = factor.status === "active" ? "inactive" : "active";
      console.log(`Factor ${factor.id} status toggled to: ${factor.status}`);
    },

    deleteFactor(factor) {
      if (
        confirm(
          `Are you sure you want to delete correction factor #${factor.id}?`,
        )
      ) {
        const index = this.correctionFactors.findIndex(
          (f) => f.id === factor.id,
        );
        if (index !== -1) {
          this.correctionFactors.splice(index, 1);
          console.log(`Factor ${factor.id} deleted`);
        }
      }
    },

    addNewFactor() {
      console.log("Add new correction factor");
      this.$emit("add-factor");
    },
  },
};
