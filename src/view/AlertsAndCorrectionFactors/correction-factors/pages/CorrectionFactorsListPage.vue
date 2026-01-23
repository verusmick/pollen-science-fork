<template>
  <div class="correction-factors-list">
    <!-- Header -->
    <div class="mb-4">
      <p class="text-muted mb-0">
        Adjust and manage corrections applied to detected pollen peaks.
      </p>
    </div>

    <!-- Filter Bar -->
    <CorrectionFactorsFilterBar />

    <!-- Correction Factors List -->
    <div class="correction-factors-container">
      <!-- Empty State -->
      <div v-if="filteredFactors.length === 0" class="text-center py-5 border rounded bg-light">
        <i class="fas fa-filter fa-2x text-muted mb-3"></i>
        <h5 class="text-muted">No correction factors found</h5>
        <p class="text-muted">Try adjusting your filters</p>
      </div>

      <!-- Correction Factor Cards -->
      <div v-for="factor in filteredFactors" :key="factor.id" class="correction-factor-card card mb-3">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
              <div class="d-flex align-items-center mb-1">
                <span class="badge badge-secondary mr-2">#{{ factor.id }}</span>
                <h5 class="card-title mb-0">{{ factor.name }}</h5>
              </div>

              <!-- Location -->
              <div class="mb-1">
                <strong>Location:</strong> {{ factor.location }}
              </div>

              <!-- Pollens -->
              <div class="mb-1">
                <strong>Pollens:</strong>
                <span v-for="(pollen, index) in factor.pollens" :key="pollen" class="badge mr-1"
                  :class="`badge-${getPollenColor(pollen)}`">
                  {{ pollen }}
                </span>
              </div>

              <!-- Date Range -->
              <div class="mb-1">
                <strong>Date range:</strong> {{ factor.dateRange }}
              </div>

              <!-- Additional Info -->
              <div v-if="factor.additionalInfo" class="mt-2">
                <small class="text-muted">{{ factor.additionalInfo }}</small>
              </div>
            </div>

            <!-- Actions -->
            <div class="d-flex flex-column align-items-end">
              <!-- Status Badge -->
              <span class="badge mb-2" :class="`badge-${getStatusClass(factor.status)}`">
                {{ factor.status }}
              </span>

              <!-- Edit Button -->
              <button class="btn btn-sm btn-outline-primary" @click="editFactor(factor)">
                Edit
              </button>
            </div>
          </div>

          <!-- Footer -->
          <div class="d-flex justify-content-between align-items-center pt-2 border-top">
            <div class="small text-muted">
              Created: {{ factor.createdDate }}
              <span v-if="factor.modifiedDate" class="ml-2">
                • Modified: {{ factor.modifiedDate }}
              </span>
            </div>
            <div class="small">
              <button class="btn btn-sm btn-outline-secondary mr-2" @click="toggleFactorStatus(factor)">
                {{ factor.status === 'active' ? 'Deactivate' : 'Activate' }}
              </button>
              <button class="btn btn-sm btn-outline-danger" @click="deleteFactor(factor)">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add New Button -->
    <div class="mt-4 text-right">
      <button class="btn btn-primary" @click="addNewFactor">
        <i class="fas fa-plus mr-2"></i> Add Correction Factor
      </button>
    </div>
  </div>
</template>
<script>
import CorrectionFactorsFilterBar from "../components/CorrectionFactorsFiltersSection.vue";


export default {
  name: "CorrectionFactorsListPage",
  components: {
    CorrectionFactorsFilterBar,
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

</script>