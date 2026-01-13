import _ from "lodash";
import { defineComponent } from "vue";

export default defineComponent({
  name: "RuleItem",
  components: {},
  data: function () {
    return {};
  },
  props: {
    rule: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  watch: {},
  methods: {
    toggleActive(activeState) {
      if (this.rule.isActive !== activeState) {
        this.$emit("toggle", this.rule.id, activeState);
      }
    },

    handleEdit() {
      this.$emit("edit", this.rule);
    },
  },
  mounted: function () {},
  updated: function () {},
});
