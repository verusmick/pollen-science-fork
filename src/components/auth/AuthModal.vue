<template>
  <div class="auth-modal">
    <form class="auth-modal__panel" @submit.prevent="handleSubmit">
      <h2 class="auth-modal__title">Authentication required</h2>
      <p class="auth-modal__description">Please enter your credentials to continue</p>

      <div class="auth-modal__fields">
        <input
          v-model="username"
          class="auth-modal__input"
          type="text"
          placeholder="Username"
          autocomplete="username"
          autofocus
        >

        <input
          v-model="password"
          class="auth-modal__input"
          type="password"
          placeholder="Password"
          autocomplete="current-password"
        >

        <p v-if="error" class="auth-modal__error">{{ error }}</p>

        <button class="auth-modal__button" type="submit">Enter</button>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../../auth/authState';

export default defineComponent({
  name: 'AuthModal',
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const error = ref('');

    const handleSubmit = () => {
      const success = login(username.value, password.value);

      if (!success) {
        error.value = 'Invalid username or password';
        window.setTimeout(() => {
          router.replace('/unauthorized');
        }, 800);
        return;
      }

      router.replace('/aktuell');
    };

    return {
      username,
      password,
      error,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
.auth-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(248, 250, 252, 0.94);
  backdrop-filter: blur(4px);
}

.auth-modal__panel {
  width: min(100%, 360px);
  margin: 0;
  padding: 24px;
  color: #172033;
  background: #ffffff;
  border: 1px solid #d7dde8;
  border-radius: 8px;
  box-shadow: 0 24px 60px rgba(17, 24, 39, 0.14);
}

.auth-modal__title {
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.25;
}

.auth-modal__description {
  margin: 0 0 20px;
  color: #5f6b7a;
  font-size: 14px;
  line-height: 1.4;
}

.auth-modal__fields {
  display: grid;
  gap: 14px;
}

.auth-modal__input {
  width: 100%;
  height: 42px;
  padding: 0 12px;
  color: #172033;
  background: #ffffff;
  border: 1px solid #c9d1dc;
  border-radius: 6px;
  font-size: 14px;
  line-height: 42px;
  outline: none;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}

.auth-modal__input::placeholder {
  color: #7b8796;
}

.auth-modal__input:focus {
  border-color: #3168d8;
  box-shadow: 0 0 0 3px rgba(49, 104, 216, 0.14);
}

.auth-modal__error {
  margin: -2px 0 0;
  color: #c03535;
  font-size: 14px;
  line-height: 1.4;
}

.auth-modal__button {
  width: 100%;
  height: 42px;
  color: #ffffff;
  background: #3168d8;
  border: 0;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  line-height: 42px;
  cursor: pointer;
  transition: background 160ms ease, box-shadow 160ms ease;
}

.auth-modal__button:hover {
  background: #2559bf;
}

.auth-modal__button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(49, 104, 216, 0.22);
}
</style>
