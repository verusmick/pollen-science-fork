import PageLayout from "./../../layouts/PageLayout.vue"
import {useMeta} from "vue-meta";

export default ({
  name: "Impressum",
  components: {
    "page-layout": PageLayout
  },
  created() {
    useMeta({
      title: "Pollen Science - Impressum",
      meta: [
        { "name": "description", "content": "Im Impressum finden Sie die Ansprechpartner für diese Webseite." }
      ]
    });
  },
})