<template>
  <div class="input-group search-input">
    <input type="text" class="form-control" :placeholder="placeholder" :value="modelValue" @input="onInput"
      @keyup.enter="emitSearch" />

    <div class="input-group-append">
      <button class="btn btn-outline-secondary" type="button" @click="emitSearch" aria-label="Search">
        <span class="fad fa-search"></span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Search...'
  }
})

const emit = defineEmits(['update:modelValue', 'search'])

function onInput(event) {
  emit('update:modelValue', event.target.value)
}

function emitSearch() {
  emit('search')
}
</script>

<style scoped>
.search-input .form-control {
  border-right: 0;
}

.search-input .btn {
  border-left: 0;
}
</style>
