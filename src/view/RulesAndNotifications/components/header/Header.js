import _ from "lodash";
import { defineComponent } from "vue";

import AddNewRuleButton from "./button/addNewRuleButton.vue";

export default defineComponent({
  name: "Header",
  components: {
    'add-new-rule-button': AddNewRuleButton
  },
  data: function () {
    return {};
  },
  props: {},
  watch: {},
  methods: {},
  mounted: function () {},
  updated: function () {},
});
