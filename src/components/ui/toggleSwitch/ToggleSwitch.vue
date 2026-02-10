<template>
  <div class="toggle-switch">
    <div class="btn-group btn-group-toggle" :class="{ 'btn-group-sm': small, 'btn-group-lg': large }"
      data-toggle="buttons">
      <!-- On Button -->
      <label class="btn" :class="{
        'btn-primary active': value,
        'btn-outline-secondary': !value,
        'btn-sm': small,
        'btn-lg': large
      }" @click="toggle(true)">
        <input type="radio" :name="name" :checked="value" autocomplete="off" :disabled="disabled" />
        {{ onLabel }}
      </label>

      <!-- Off Button -->
      <label class="btn" :class="{
        'btn-primary active': !value,
        'btn-outline-secondary': value,
        'btn-sm': small,
        'btn-lg': large
      }" @click="toggle(false)">
        <input type="radio" :name="name" :checked="!value" autocomplete="off" :disabled="disabled" />
        {{ offLabel }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToggleSwitch",
  props: {
    // Current value (true = On, false = Off)
    value: {
      type: Boolean,
      required: true
    },
    // Size variants
    small: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    // Labels
    onLabel: {
      type: String,
      default: "On"
    },
    offLabel: {
      type: String,
      default: "Off"
    },
    // Unique name for radio group
    name: {
      type: String,
      default: () => `toggle-${Math.random().toString(36).substr(2, 9)}`
    },
    // Disabled state
    disabled: {
      type: Boolean,
      default: false
    },
    // Emit on change only when value differs
    emitOnlyOnChange: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    toggle(newValue) {
      if (this.disabled) return;

      // Only emit if value actually changes or emitOnlyOnChange is false
      if (!this.emitOnlyOnChange || this.value !== newValue) {
        this.$emit('input', newValue);
        this.$emit('change', newValue);
      }
    }
  }
};
</script>

<style scoped>
.toggle-switch {
  display: inline-block;
}

/* Remove radio button circles */
.btn-group-toggle input[type="radio"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
}

/* Hover effects for enabled buttons */
.btn-group-toggle .btn:not(.disabled):not(:disabled):hover {
  opacity: 0.85;
}

/* Active state styling */
.btn-group-toggle .btn.active {
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
}

/* Disabled state */
.btn-group-toggle .btn.disabled,
.btn-group-toggle .btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

/* Ensure buttons are same width for consistency */
.btn-group-toggle .btn {
  min-width: 60px;
}
</style>