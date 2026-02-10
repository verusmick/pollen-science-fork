<template>
  <PageLayout :use-container="false">
    <div class="next-iframe-wrapper">
      <iframe :src="iframeUrl" class="next-iframe" frameborder="0" allowfullscreen />
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from "../../layouts/PageLayout.vue";

export default {
  name: 'RulesAndNotifications',
  components: {
    PageLayout
  },
  computed: {
    iframeUrl() {
      return "https://pollen-ui-testing.vercel.app/rules-and-notifications";
    },
  },
}
</script>
<style scoped>
.next-iframe-wrapper {
  width: 100%;
  height: calc(100vh - var(--navbar-height, 64px));
  overflow: hidden;
}

.next-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>