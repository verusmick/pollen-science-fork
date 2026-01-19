<template>
  <page-layout :use-container="false">
    <div class="container-fluid mt-3">

      <!-- Tabs -->
      <ul class="nav nav-tabs mb-3">
        <li class="nav-item">
          <a class="nav-link active">Alerts</a>
        </li>
        <li class="nav-item">
          <a class="nav-link">Correction Factors</a>
        </li>
      </ul>

      <!-- Filters -->
      <FiltersBar />

      <!-- Alerts List -->
      <div class="alert-list">
        <AlertCard v-for="alert in alerts" :key="alert.id" :alert="alert" />
      </div>

    </div>
  </page-layout>

</template>

<script setup>
  import PageLayout from "./../../layouts/PageLayout.vue";
import FiltersBar from "./components/filters/Filters.vue";
import AlertCard from "./components/ruleItem/RuleItem.vue";

const alerts = [
  {
    id: 1,
    severity: "red",
    pollenType: "Birch",
    pollenCount: 247,
    station: "Hof",
    rule: "Birch Season Monitoring",
    time: "2h ago",
    status: "Resolved",
    correction: true
  },
  {
    id: 2,
    severity: "yellow",
    pollenType: "Grass",
    pollenCount: 132,
    station: "Feucht",
    rule: "Grass Peak Season Monitoring",
    time: "6h ago",
    status: "Open",
    correction: false
  },
  {
    id: 3,
    severity: "green",
    pollenType: "Mould",
    pollenCount: 23,
    station: "Feucht",
    rule: "Mould Activity Watch",
    time: "2d ago",
    status: "Resolved",
    correction: true
  }
];
</script>

<style scoped>
.alert-list {
  max-height: 75vh;
  overflow-y: auto;
}
</style>
