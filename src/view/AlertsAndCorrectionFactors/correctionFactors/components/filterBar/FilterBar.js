import { defineComponent } from "vue";
export default defineComponent({
  name: "FilterBar",
  data() {
    return {
      filters: {
        id: "",
        pollenType: "",
        station: "",
        status: "",
      }
    };
  },

  methods: {},
});