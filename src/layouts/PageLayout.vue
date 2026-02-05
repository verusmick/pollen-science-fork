<template>
  <div class="root">
    <Navigation />
    <div :class="{ 'container-fluid': useContainer, 'mt-3': useContainer }">
      <slot />
    </div>
  </div>
</template>

<script>
import Navigation from "./../components/navigation/Navigation.vue";

export default {
  name: "PageLayout",
  components: {
    Navigation,
  },
  props: {
    useContainer: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style src="./PageLayout.scss" scoped></style>
