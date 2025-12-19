import PageLayout from "./../../layouts/PageLayout.vue"
import {useMeta} from "vue-meta";

export default ({
  name: "Hintergrund",
  components: {
    "page-layout": PageLayout
  },
  created() {
    useMeta({
      title: "Pollen Science - Hintergrund & Erläuterungen",
      meta: [
        { "name": "description", "content": "Hintergrund und Erläuterungen zur Seite pollenscience.eu." }
      ]
    });
  },
})