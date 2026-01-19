<template>
  <div class="form-group mb-0">
    <select class="form-control" :value="modelValue" @change="onChange">
      <!-- Placeholder (instructional, non-selectable) -->
      <option v-if="placeholder" value="" disabled hidden>
        {{ placeholder }}
      </option>

      <!-- Empty / Reset option (selectable) -->
      <option v-if="allowEmpty" :value="emptyValue">
        {{ emptyLabel }}
      </option>

      <!-- Normal options -->
      <option v-for="option in options" :key="getValue(option)" :value="getValue(option)">
        {{ getLabel(option) }}
      </option>
    </select>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number, null],
    default: ''
  },
  options: {
    type: Array,
    required: true
  },
  optionLabel: {
    type: String,
    default: 'label'
  },
  optionValue: {
    type: String,
    default: 'value'
  },

  /* Placeholder */
  placeholder: {
    type: String,
    default: ''
  },

  /* Empty / Reset */
  allowEmpty: {
    type: Boolean,
    default: false
  },
  emptyLabel: {
    type: String,
    default: 'All'
  },
  emptyValue: {
    type: [String, Number, null],
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

function getLabel(option) {
  return typeof option === 'object'
    ? option[props.optionLabel]
    : option
}

function getValue(option) {
  return typeof option === 'object'
    ? option[props.optionValue]
    : option
}

function onChange(event) {
  const value =
    event.target.value === String(props.emptyValue)
      ? props.emptyValue
      : event.target.value

  emit('update:modelValue', value)
  emit('change', value)
}
</script>
