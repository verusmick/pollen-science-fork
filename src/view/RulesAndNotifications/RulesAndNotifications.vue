<template>
  <PageLayout :use-container="false">
    <div class="next-iframe-wrapper">
      <iframe ref="iframeRef" :src="iframeUrl" class="next-iframe" frameborder="0" allowfullscreen />
    </div>
  </PageLayout>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import PageLayout from "../../layouts/PageLayout.vue";
import { registerIframe, initIframeListener } from "../../services/iframeBridge";

export default {
  name: "RulesAndNotifications",
  components: {
    PageLayout
  },
  setup() {
    const { locale } = useI18n();
    const route = useRoute();
    const iframeRef = ref(null);

    const iframeUrl = computed(() => {
      const routeLocale = route.params.locale;
      const lang = routeLocale || locale?.value || "en";
      const section = route.params.section ? `/${route.params.section}` : "";

      return `${global.env.iframePath}/${lang}/rules-and-notifications${section}`;
    });

    onMounted(() => {
      if (iframeRef.value?.contentWindow) {
        registerIframe(iframeRef.value.contentWindow);
      }
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
