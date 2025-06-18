import AuthController from "./auth/controller/auth_controller";
import DashboardController from "./dashboard/controller/dashboard_controller";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomeView from "./dashboard/view/home_view";
import ToursView from "./tours/view/tours_view";
import PageNotFound from "./common/common_view_components/page_not_found";
import DestinationsController from "./destinations/controller/destinations_controller";
import TravelThemesController from "./Travel Themes/controller/travelThemes_controller";
import HotelsController from "./hotels/controller/hotels_controller";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<AuthController />} />

        <Route path="/" element={<DashboardController />}>
          <Route index path="home" element={<HomeView />} />
          <Route path="destinations" element={<DestinationsController />} />
          <Route path="travelThemes" element={<TravelThemesController />} />
          <Route path="hotels" element={<HotelsController />} />
          <Route path="tours" element={<ToursView />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
