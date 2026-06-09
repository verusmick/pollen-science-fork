<template>
  <main class="unauthorized-page">
    <h1>Unauthorized</h1>
    <p>Invalid username or password.</p>
  </main>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UnauthorizedView',
});
</script>

<style scoped>
.unauthorized-page {
  min-height: 100vh;
  display: grid;
  place-content: center;
  padding: 32px;
  color: #172033;
  text-align: center;
  background: #f8fafc;
}

.unauthorized-page h1 {
  margin: 0 0 8px;
  font-size: 32px;
  line-height: 1.2;
}

.unauthorized-page p {
  margin: 0;
  color: #5f6b7a;
  font-size: 16px;
}
</style>
