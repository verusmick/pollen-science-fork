import _ from "lodash";
import { useMeta } from "vue-meta";

import PageLayout from "./../../layouts/PageLayout.vue";
import Header from "./components/header/Header.vue";
import Filters from "./components/filters/Filters.vue";
import RulesList from "./components/rulesList/RulesList.vue";

export default {
  name: "RulesAndNotifications",
  components: {
    "page-layout": PageLayout,
    "header-section": Header,
    filters: Filters,
    "rules-list": RulesList,
  },
  created() {
    useMeta({
      title: "Pollen Science - Regeln und Benachrichtigungen",
      meta: [
        {
          name: "description",
          content:
            "Auf dieser Seite sehen Sie alle benutzerdefinierten Regeln, die erstellt wurden, um zu warnen, wenn Pollen außerhalb der Pollensaison fliegen könnten.",
        },
      ],
    });
  },
  data: () => {
    return {};
  },
  computed: {},
  methods: {},
};
