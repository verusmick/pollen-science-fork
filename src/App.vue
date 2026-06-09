<template>
  <metainfo>
    <template v-slot:title="{ content }"></template>
  </metainfo>
  <AuthGate>
    <RouterView/>
  </AuthGate>
</template>

<script>
import {defineComponent} from 'vue';
import {useMeta} from "vue-meta";
import AuthGate from './components/auth/AuthGate.vue';
export default defineComponent({
  name: 'App',
  components: {
    AuthGate,
  },
  setup () {
    useMeta({ title: 'Pollen Science' })
  }
});
</script>
