<template>
  <template v-if="authState.initialized">
    <slot />
    <AuthModal v-if="!authState.isAuthenticated" />
  </template>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import AuthModal from './AuthModal.vue';
import { useAuth } from '../../auth/authState';

export default defineComponent({
  name: 'AuthGate',
  components: {
    AuthModal,
  },
  setup() {
    const { authState, initAuth } = useAuth();

    onMounted(() => {
      initAuth();
    });

    return {
      authState,
    };
  },
});
</script>
