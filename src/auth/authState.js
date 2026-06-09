import { reactive } from 'vue';

const STORAGE_KEY = 'app-authenticated';

const authState = reactive({
    initialized: false,
    isAuthenticated: false,
});

export function initAuth() {
    if (authState.initialized) {
        return;
    }

    authState.isAuthenticated = sessionStorage.getItem(STORAGE_KEY) === 'true';
    authState.initialized = true;
}

export function login(username, password) {
    const valid =
        username === global.env.authUsername &&
        password === global.env.authPassword &&
        Boolean(global.env.authUsername) &&
        Boolean(global.env.authPassword);

    if (valid) {
        authState.isAuthenticated = true;
        sessionStorage.setItem(STORAGE_KEY, 'true');
    }

    return valid;
}

export function logout() {
    authState.isAuthenticated = false;
    sessionStorage.removeItem(STORAGE_KEY);
}

export function useAuth() {
    return {
        authState,
        initAuth,
        login,
        logout,
    };
}
