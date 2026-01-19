import ToggleSwitch from "../../../../components/ui/toggleSwitch/ToggleSwitch.vue";

export default {
  name: "RuleItem",
  components: {
    ToggleSwitch,
  },
  props: {
    rule: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      localIsActive: this.rule.isActive !== false,
    };
  },
  watch: {
    "rule.isActive": {
      handler(newVal) {
        this.localIsActive = newVal !== false;
      },
      immediate: true,
    },
  },
  methods: {
    handleToggleChange(newValue) {
      this.$emit("toggle", this.rule.id, newValue);
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
