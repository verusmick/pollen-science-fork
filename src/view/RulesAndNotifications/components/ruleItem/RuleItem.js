export default {
  name: "RuleItem",
  props: {
    rule: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  computed: {
    isActive() {
      return this.rule.isActive !== false; // Default to true if not specified
    },
  },
  methods: {
    toggleActive(activeState) {
      if (this.isActive !== activeState) {
        this.$emit("toggle", this.rule.id, activeState);
      }
    },

    getTagColor(pollenType) {
      const colorMap = {
        Birch: "primary",
        Grass: "success",
        Mould: "info",
        Ragweed: "danger",
      };
      return colorMap[pollenType] || "secondary";
    },
  },
};
