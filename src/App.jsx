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
import CarouselsController from "./Carousels/controller/carousels_controller";
import TrekkingView from "./trekkings/view/trekkings_view";
import ToursAddEditForm from "./tours/view/tour_add_edit_form";
import TrekkingAddEditForm from "./trekkings/view/trekking_add_edit_form";
import ExpeditionsView from "./Expeditions/view/expeditions_view";
import TrekkingsView from "./trekkings/view/trekkings_view";
import ExpeditionsAddEditForm from "./Expeditions/view/expedition_add_edit_form";
import PeakClimbingsView from "./peak climbings/view/peakClimbings_view";
import PeakClimbingsAddEditForm from "./peak climbings/view/peakClimbing_add_edit_form";
import AdventuresAddEditForm from "./adventures/view/adventure_add_edit_form";
import AdventuresView from "./adventures/view/adventures_view";
import AboutView from "./about/view/about_view";
import ContactView from "./contact/view/contact_view";


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
          {/* <Route path="hotelCategory" element={<HotelsCategoryController />} /> */}
          <Route path="carousels" element={<CarouselsController />} />
          <Route path="tours" element={<ToursView />} />
          <Route path="tours/addTourPackage" element={<ToursAddEditForm />} />
          <Route path="trekkings" element={<TrekkingsView />} />
          <Route path="trekkings/addTrekkingPackage" element={<TrekkingAddEditForm />} />
          <Route path="expeditions" element={<ExpeditionsView />} />
          <Route path="expeditions/addExpeditionPackage" element={<ExpeditionsAddEditForm />} />
          <Route path="peakClimbings" element={<PeakClimbingsView />} />
          <Route path="peakClimbings/addPeakClimbingPackage" element={<PeakClimbingsAddEditForm />} />
          <Route path="adventures" element={<AdventuresView />} />
          <Route path="adventures/addAdventurePackage" element={<AdventuresAddEditForm />} />
          
          <Route path="/about"  element={<AboutView />}/>
          <Route path="/contact"  element={<ContactView />}/>

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
