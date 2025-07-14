import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import i18n from "./i18n/i18n";
import { useStateContext } from "./contexts/ContextProvider";
import Projects from "./views/menu/projects/Projects";
import Teams from "./views/menu/teams/Teams";
import AddProjectForm from "./views/menu/projects/AddProjectForm";
import { motion, AnimatePresence } from "framer-motion";
import AddTeamForm from "./views/menu/teams/AddTeamForm";
import Pages from "./views/menu/pages/Pages";
import AddPageForm from "./views/menu/pages/AddPageForm";
import StaticPageDetails from "./views/menu/pages/StaticPageDetails";
import Services from "./views/menu/services/Services";
import AddServicesForm from "./views/menu/services/AddServicesForm";
import Sliders from "./views/menu/sliders/Sliders";
import AddSliderForm from "./views/menu/sliders/AddSliderForm";
import Settings from "./views/menu/settings/Settings";
import AddSettingsForm from "./views/menu/settings/AddSettingsForm";
import Clients from "./views/menu/clients/Clients";
import AddClientsForm from "./views/menu/clients/AddClientsForm";
import ClientsDetails from "./views/menu/clients/ClientsDetails";
import Login from "./views/ui/Login";
import MissingPage from "./views/ui/MissingPage";
import UnauthorizedPage from "./views/ui/UnauthorizedPage";
import Layout from "./views/ui/Layout";
import AddPackageForm from "./views/menu/packages/AddPackageForm";
import Packages from "./views/menu/packages/Packages";
import Blogs from "./views/menu/booking/Booking";
import AddBlogsForm from "./views/menu/booking/AddBlogsForm";
import BlockDates from "./views/menu/block/BlockDatesLIst";
import AddBlockedForm from "./views/menu/block/AddBlockDatesForm";
import Doctors from "./views/menu/doctors/Doctors";
import AddDoctorForm from "./views/menu/doctors/AddDoctorForm";
import Specilizations from "./views/menu/specilization/Specilizations";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once
    });
  }, []);

  const { lang } = useStateContext();

  // Change language dynamically when `lang` prop changes
  useEffect(() => {
    const lang = localStorage.getItem("womnizLang") ?? "en";
    if (lang) {
      i18n.changeLanguage(lang);
    }
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  }, [i18n, lang]);
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.key}>
        <Route path="/" element={<Layout />}>
          {/* Projects Routes */}

          <Route
            path="/projects"
            element={
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Projects />
              </motion.div>
            }
          />
          <Route
            path="/projects/add"
            element={
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <AddProjectForm />
              </motion.div>
            }
          />
          <Route path="/projects/add/:id" element={<AddProjectForm />} />
          {/* Projects Routes */}

          {/* Login Routes */}
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Projects />} />
          {/* Login Routes */}

          {/* Teams Routes */}
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/add" element={<AddTeamForm />} />
          <Route path="/teams/add/:id" element={<AddTeamForm />} />
          {/* Teams Routes */}

          {/* Pages Routes */}
          <Route path="/pages" element={<Pages />} />
          <Route path="/pages/add/:id" element={<AddPageForm />} />
          <Route path="/pages/details/:id" element={<StaticPageDetails />} />
          {/* Pages Routes */}

          {/* Services Routes */}
          <Route path="/services" element={<Services />} />
          <Route path="/services/add" element={<AddServicesForm />} />
          <Route path="/services/add/:id" element={<AddServicesForm />} />
          {/* Services Routes */}

          {/* Sliders Routes */}
          <Route path="/sliders" element={<Sliders />} />
          <Route path="/sliders/add" element={<AddSliderForm />} />
          <Route path="/sliders/add/:id" element={<AddSliderForm />} />
          {/* Sliders Routes */}

          {/* Settings Routes */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/add" element={<AddSettingsForm />} />
          <Route path="/settings/add/:id" element={<AddSettingsForm />} />
          {/* Settings Routes */}

          {/* Clients Routes */}
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/add" element={<AddClientsForm />} />
          <Route path="/clients/add/:id" element={<AddClientsForm />} />
          <Route path="/clients/client-preview" element={<ClientsDetails />} />
          {/* Clients Routes */}

          {/* Packages Routes */}
          {/* <Route path="/packages" element={<NewPackages lang="ar" />} /> */}
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/add" element={<AddPackageForm />} />
          <Route path="/packages/add/:id" element={<AddPackageForm />} />
          {/* Packages Routes */}

          {/*booking */}
          <Route path="/booking" element={<Blogs />} />
          <Route path="/blogs/add" element={<AddBlogsForm />} />
          <Route path="/blogs/view/:id" element={<AddBlogsForm />} />
          {/* booking*/}

          {/* blocks*/}
          <Route path="/blocks-dates" element={<BlockDates />} />
          <Route path="/blocks-dates/add" element={<AddBlockedForm />} />
          {/* blocks */}
          {/* Doctors*/}
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/add" element={<AddDoctorForm />} />
          <Route path="/doctors/add/:id" element={<AddDoctorForm />} />
          {/* Doctors */}
          {/* Specilizations*/}
          <Route path="/specilizations" element={<Specilizations />} />
          {/* Specilizations */}

          <Route path="unauthorized" element={<UnauthorizedPage />} />

          <Route path="*" element={<MissingPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
