import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {
  adminsAR,
  adminsEN,
  commonAR,
  commonEN,
  ordersAR,
  ordersEN,
  productsAR,
  productsEN,
  sidebarAR,
  sidebarEN,
  customersAR,
  customersEN,
  requestsAR,
  requestsEN,
  vendorsAR,
  vendorsEN,
  logoutAR,
  logoutEN,
  projectsAR,
  projectsEN,
  teamsAR,
  teamsEN,
} from "../../public/locals";

export const defaultNS = "common";

export const resources = {
  en: {
    admins: adminsEN,
    products: productsEN,
    orders: ordersEN,
    sidebar: sidebarEN,
    common: commonEN,
    customers: customersEN,
    requests: requestsEN,
    vendors: vendorsEN,
    logout: logoutEN,
    projects: projectsEN,
    teams: teamsEN,
  },
  ar: {
    admins: adminsAR,
    products: productsAR,
    orders: ordersAR,
    sidebar: sidebarAR,
    common: commonAR,
    customers: customersAR,
    requests: requestsAR,
    vendors: vendorsAR,
    logout: logoutAR,
    projects: projectsAR,
    teams: teamsAR,
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: "ar", // default language
  fallbackLng: "en",
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
