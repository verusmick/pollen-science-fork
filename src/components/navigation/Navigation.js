import $ from "jquery";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import {getCurrentInstance, inject} from "vue";
import { ref } from "vue";

export default {
    name: "Navigation",
    setup() {
        const route = useRoute();
        const router = useRouter();
        const { t, locale } = useI18n();
        // const secured = inject("$secured");
        const app = getCurrentInstance()
        const secured = app.appContext.config.globalProperties.$secured;

        const currentPage = ref(route.path);

        const setLanguage = (lang) => {
            router.replace({ query: { ...router.currentRoute.value.query, lang } })
                .then(() => {
                    locale.value = lang;
                })
                .catch((error) => {
                    console.error("Failed to set language:", error);
                });
        };

        const logout = () => {
            $.ajax({
                type: "GET",
                url: "/s",
                async: false,
                username: "logmeout",
                password: "",
                headers: { Authorization: "Basic xxx" },
            })
                .done(function () {
                    // no-op by intention
                })
                .fail(function () {
                    window.location = "/";
                });
        };

        return {
            currentPage,
            setLanguage,
            logout,
            t,
            secured,
            locale
        };
    },
};