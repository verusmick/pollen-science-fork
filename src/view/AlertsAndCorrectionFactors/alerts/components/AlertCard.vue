<template>
  <div class="card mb-3 alert-card rounded" @click="navigateToDetails">
    <div class="d-flex align-items-stretch">
      <!-- Severity Block -->
      <div :class="severityBlockClass">
        <div class="severity-label text-white">
          <!-- {{ severityLabel }} -->
        </div>
      </div>

      <!-- Alert Content -->
      <div class="flex-fill p-3">
        <div class="d-flex justify-content-between align-items-start">
          <!-- Left Content -->
          <div class="flex-fill">
            <!-- Main Alert Info -->
            <div class="mb-2">
              <span :class="severityDotClass" class="mr-2"></span>
              <strong class="font-weight-bold">{{ alert.pollenType }}</strong>
              <span v-if="alert.correction" class="ml-2 small font-weight-normal text-muted">
                · Correction Applied
              </span>
            </div>

            <!-- Details -->
            <div class="text-muted mb-1 small">
              {{ alert.pollenCount }} pollen/m³ · {{ alert.station }}
            </div>

            <!-- Rule -->
            <div class="mb-1 small">
              Triggered by rule: <strong>{{ alert.rule }}</strong>
            </div>

            <!-- Time -->
            <div class="text-muted small">{{ alert.time }}</div>
          </div>

          <!-- Right Content - Status -->
          <div class="text-right d-flex flex-column align-items-end pl-3">
            <div v-if="alert.correction" class="mb-2">
              <span class="badge badge-secondary small font-weight-normal">
                Correction Applied
              </span>
            </div>
            <div class="mb-1">
              <span :class="statusBadgeClass"> {{ alert.status }} </span>
            </div>
            <a href="#" class="text-primary small">View Details</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from "vue-router";

export default {
  name: "AlertCard",
  props: {
    alert: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  setup() {
    const router = useRouter();

    const navigateToDetails = () => {
      router.push("/details-zur-warnmeldung");
    };

    return {
      navigateToDetails,
    };
  },
  computed: {
    severityLabel() {
      const labels = {
        red: "RED ALERT",
        yellow: "WARNING",
        green: "ALERT",
      };
      return (
        labels[this.alert.severity] || (this.alert.severity || "").toUpperCase()
      );
    },

    severityBlockClass() {
      const base = "severity-block";
      const color =
        {
          red: "bg-danger",
          yellow: "bg-warning",
          green: "bg-success",
        }[this.alert.severity] || "bg-secondary";
      return `${base} ${color}`;
    },

    severityDotClass() {
      return (
        {
          red: "dot-danger",
          yellow: "dot-warning",
          green: "dot-success",
        }[this.alert.severity] || "dot-secondary"
      );
    },

    statusBadgeClass() {
      const base = "badge";
      if (this.alert.status === "Resolved") {
        return `${base} badge-success`;
      } else if (this.alert.status === "Open") {
        return `${base} badge-dark`;
      } else {
        return `${base} badge-secondary`;
      }
    },
  },
};
</script>
<style scoped>
.alert-card {
  border-left: 3px solid transparent;
  border: 1px solid #e9ecef;
  transition: all 0.15s ease;
}

.alert-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-left-color: #007bff;
  cursor: pointer;
}

.severity-block {
  width: 60px;
  min-width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 1.25rem;
  border-bottom-left-radius: 1.25rem;
}

.severity-label {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-weight: bold;
  font-size: 11px;
  letter-spacing: 0.5px;
}

/* Severity dots */
.dot-danger,
.dot-warning,
.dot-success,
.dot-secondary {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dot-danger {
  background-color: #dc3545;
}

.dot-warning {
  background-color: #ffc107;
}

.dot-success {
  background-color: #28a745;
}

.dot-secondary {
  background-color: #6c757d;
}

/* Badge styling */
.badge {
  font-size: 0.75rem;
  padding: 0.25em 0.6em;
  font-weight: 500;
}

/* Typography */
small {
  font-size: 0.875rem;
}

.text-muted {
  color: #6c757d !important;
}

/* Ensure proper spacing */
.d-flex>div {
  min-width: 0;
  /* Prevent flex items from overflowing */
}
</style>