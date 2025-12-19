<template>
  <div class="root">
    <Navigation />
    <div class="container-fluid mt-3">
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
};
</script>

<style src="./PageLayout.scss" scoped></style>
