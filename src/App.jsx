import AuthController from "./auth/controller/auth_controller";
import DashboardController from "./dashboard/controller/dashboard_controller";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomeView from "./dashboard/view/home_view";
import PageNotFound from "./common/common_view_components/page_not_found";
import DestinationsController from "./destinations/controller/destinations_controller";
import TravelThemesController from "./travel_themes/controller/travelThemes_controller";
import HotelsController from "./hotels/controller/hotels_controller";
import CarouselsController from "./Carousels/controller/carousels_controller";
import PeakClimbingsView from "./peak climbings/view/peakClimbings_view";
import AdventuresView from "./adventures/view/adventures_view";
import AboutView from "./about/view/about_view";
import ContactView from "./contact/view/contact_view";
import ToursController from "./tours/controller/tours_controller";
import TripHighLightsController from "./trip highlights/controller/tripHighlights_controller";
import TrekkingsController from "./trekkings/controller/trekkings_controller";
import ExpeditionsController from "./expeditions/controller/expeditions_controller";
import ReviewsController from "./reviews/controller/reviews_controller";
import BlogsController from "./blogs/controller/blogs_controller";

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
          <Route path="tours" element={<ToursController />} />
          <Route path="triphighlights" element={<TripHighLightsController />} />
          <Route path="trekkings" element={<TrekkingsController />} />
          <Route path="expeditions" element={<ExpeditionsController />} />
          <Route path="reviews" element={<ReviewsController />} />
          <Route path="blogs" element={<BlogsController />} />
          <Route path="peakClimbings" element={<PeakClimbingsView />} />
          <Route path="adventures" element={<AdventuresView />} />

          <Route path="/about" element={<AboutView />} />
          <Route path="/contact" element={<ContactView />} />

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
