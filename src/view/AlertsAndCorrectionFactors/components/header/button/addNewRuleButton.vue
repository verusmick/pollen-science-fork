<script setup>
import { AkCirclePlusFill } from '@kalimahapps/vue-icons';
</script>

<template>
  <button class=" btn btn-lg btn-primary icon-btn add-new-rule-button">
    <AkCirclePlusFill />
    <p v-t="'page.rulesAndNotifications.addNewRule'" />
  </button>

</template>

<style scoped>
.add-new-rule-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 54px;
  width: 176px;

  p {
    margin-left: 5px;
    font-size: 16px;
    font-weight: 300;
    margin-bottom: 0;
  }
}
</style>