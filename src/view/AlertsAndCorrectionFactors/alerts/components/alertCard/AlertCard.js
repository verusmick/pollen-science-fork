export default {
  name: "AlertCard",
  props: {
    alert: {
      type: Object,
      required: true,
      default: () => ({}),
    },
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
