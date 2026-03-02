import $ from "jquery";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import {getCurrentInstance, inject} from "vue";
import { ref } from "vue";
import { sendToIframe } from "../../services/iframeBridge";

export default {
    name: "Navigation",
    setup() {
        const route = useRoute();
        const router = useRouter();
        const { t, locale } = useI18n();
        // const secured = inject("$secured");
        const app = getCurrentInstance()
        const secured = app.appContext.config.globalProperties.$secured;
        const iframeRef = ref(null);
        const currentPage = ref(route.path);

        const setLanguage = (lang) => {
            router.replace({ query: { ...router.currentRoute.value.query, lang } })
                .then(() => {
                    locale.value = lang;
                    sendToIframe({
                        type: "SET_LOCALE",
                        locale: lang
                    });
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
            iframeRef,
            currentPage,
            setLanguage,
            logout,
            t,
            secured,
            locale
        };
    },
};