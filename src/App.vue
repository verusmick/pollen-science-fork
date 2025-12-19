<template>
  <metainfo>
    <template v-slot:title="{ content }"></template>
  </metainfo>
  <RouterView/>
</template>

<script>
import {defineComponent} from 'vue';
import {useMeta} from "vue-meta";
export default defineComponent({
  name: 'App',
  setup () {
    useMeta({ title: 'Pollen Science' })
  }
});
</script>
