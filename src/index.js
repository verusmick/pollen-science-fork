import {createApp, ref} from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createI18n } from "vue-i18n";
import { createMetaManager } from 'vue-meta';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery";
import "popper.js";
import _ from "lodash";
import moment from "moment-timezone";
import momentDurationFormatSetup from "moment-duration-format";

import ThreeHoursView from "./view/ThreeHours/ThreeHoursView.vue";
import TwentyfourHoursView from "./view/TwentyfourHours/TwentyfourHoursView.vue";
import StatisticsView from "./view/Statistics/StatisticsView.vue";
import ImpressumView from "./view/Impressum/ImpressumView.vue";
import HintergrundView from "./view/Hintergrund/HintergrundView.vue";

import i18nMessages_de from "./assets/i18n/messages_de.json";
import i18nMessages_en from "./assets/i18n/messages_en.json";
import i18nMessages_nl from "./assets/i18n/messages_nl.json";
import i18nMessages_es from "./assets/i18n/messages_es.json";
import i18nMessages_fr from "./assets/i18n/messages_fr.json";

import "./index.css";
import App from "./App.vue";

moment.locale("de");
momentDurationFormatSetup(moment);

moment.updateLocale("de", {
    durationLabelsStandard: {
        M: "Monat",
        MM: "Monate",
        y: "Jahr",
        yy: "Jahre",
    },
});

// Router setup
const routes = [
    { path: "/aktuell", component: ThreeHoursView },
    { path: "/historie", component: TwentyfourHoursView },
    { path: "/statistik", component: StatisticsView },
    { path: "/impressum", component: ImpressumView },
    { path: "/hintergrund", component: HintergrundView },
    { path: "/:pathMatch(.*)*", redirect: "/aktuell" },
    { path: "/s", redirect: () => `/aktuell?lang=${i18n.global.locale.value}` },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.redirectedFrom && (to.redirectedFrom.fullPath.startsWith("/s?") || to.redirectedFrom.fullPath.startsWith("/s/?"))) {
        // Adding custom property to the global app instance
        app.config.globalProperties.$secured = true;
        app.provide("$secured", true);
    }
    next();
});

// i18n setup
const messages = {
    de: i18nMessages_de,
    en: i18nMessages_en,
    nl: i18nMessages_nl,
    es: i18nMessages_es,
    fr: i18nMessages_fr,
};

const i18n = createI18n({
    legacy: false,
    locale: "de",
    fallbackLocale: "de",
    messages,
});

// App setup
const app = createApp(App);
app.use(createMetaManager());
app.use(router);
app.use(i18n);
app.provide("$secured", false);

// set default location
const defaultLocationId = ref('DEBIED');
app.provide('$defaultLocationId', defaultLocationId);

app.mixin({
    created() {
        const langParam = router.currentRoute.value.query.lang;
        const hasLang = !!messages[langParam];
        if (hasLang) {
            i18n.global.locale.value = langParam;
        }
        window.pollen = _.mapValues(i18n.global.messages.value[i18n.global.locale.value]["pollenName"], (v) => {
            return { name: v };
        });
    }
});

app.mount("#app");
