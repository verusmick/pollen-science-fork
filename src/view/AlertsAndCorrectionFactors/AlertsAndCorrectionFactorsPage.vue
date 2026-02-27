<template>
  <PageLayout :use-container="false">
    <div class="next-iframe-wrapper">
      <iframe ref="iframeRef" :src="iframeUrl" class="next-iframe" frameborder="0" allowfullscreen />
    </div>
  </PageLayout>
</template>

<script>
import { ref, onMounted } from "vue";
import PageLayout from "../../layouts/PageLayout.vue";
import { registerIframe, initIframeListener } from '../../services/iframeBridge'

export default {
  name: "AlertsAndCorrectionFactors",
  components: {
    PageLayout
  },
  setup() {
    const iframeRef = ref(null);
    const iframeUrl = global.env.iframePath + '/de/alerts-and-correction-factors';
    onMounted(() => {
      if (iframeRef.value?.contentWindow) {
        registerIframe(iframeRef.value.contentWindow);
      }
      // wait READY 
      initIframeListener(global.env.iframePath);
    });

    return {
      iframeRef,
      iframeUrl
    };
  }
};
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