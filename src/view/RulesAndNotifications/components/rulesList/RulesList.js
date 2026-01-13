import _ from "lodash";
import { defineComponent } from "vue";

import RuleItem from "../ruleItem/RuleItem.vue";

export default defineComponent({
  name: "RulesList",
  components: {
    "rule-item": RuleItem,
  },
  data: function () {
    return {
      rules: [
        {
          id: "1",
          title: "Off-Season Birch Detection",
          description:
            "Notifies when Birch pollen is detected outside its typical spring season window.",
          isActive: true,
          pollenType: "Birch",
          badges: [
            { type: "primary", label: "Birch" },
            { type: "warning", label: "Alerting" },
            { type: "secondary", label: "Feucht" },
          ],
          stations: ["Feucht"],
          seasonStart: "Mar 01",
          seasonEnd: "Jun 30",
          seasonDisplay: "Mar 01 - Jun 30",
          actionType: "Alerting",
        },
        {
          id: "2",
          title: "Grass Peak Season Monitoring",
          description:
            "Alerts if Grass pollen exceeds normal levels during the high-risk summer months.",
          isActive: true,
          pollenType: "Grass",
          badges: [
            { type: "success", label: "Grass" },
            { type: "secondary", label: "Hof" },
          ],
          stations: ["Hof"],
          seasonStart: "Feb 01",
          seasonEnd: "Dec 30",
          seasonDisplay: "Feb 01 - Dec 30",
          actionType: "Monitoring",
        },
        {
          id: "3",
          title: "Mould Activity Watch",
          description:
            "Monitors Schimmel/Moulds counts and alerts when concentrations surpass predefined safety levels.",
          isActive: true,
          pollenType: "Mould",
          badges: [
            { type: "info", label: "Mould" },
            { type: "secondary", label: "Weitech" },
            { type: "secondary", label: "Hof" },
          ],
          stations: ["Weitech", "Hof"],
          seasonStart: "Dec 01",
          seasonEnd: "Jul 02",
          seasonDisplay: "Dec 01 - Jul 02",
          actionType: "Alerting",
        },
        {
          id: "4",
          title: "Seasonal Pollen Threshold Rule",
          description:
            "Notifies when selected pollen type exceeds configured alert thresholds during the defined season.",
          isActive: true,
          pollenType: "Birch",
          badges: [
            { type: "primary", label: "Birch" },
            { type: "secondary", label: "Hof" },
            { type: "secondary", label: "Garmisch" },
          ],
          stations: ["Hof", "Garmisch"],
          seasonStart: "May 06",
          seasonEnd: "Dec 03",
          seasonDisplay: "May 06 - Dec 03",
          actionType: "Threshold",
        },
      ],
      selected: !!this.preselected
        ? this.preselected
        : this.multiselect
        ? []
        : undefined,
      previousSelection: undefined,
    };
  },
  props: {},
  watch: {},
  methods: {},
  mounted: function () {},
  updated: function () {},
});
