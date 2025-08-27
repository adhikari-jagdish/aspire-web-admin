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
import AdventuresView from "./adventures/view/adventures_view";
import ContactView from "./contact/view/contact_view";
import ToursController from "./tours/controller/tours_controller";
import TripHighLightsController from "./trip highlights/controller/tripHighlights_controller";
import TrekkingsController from "./trekkings/controller/trekkings_controller";
import ExpeditionsController from "./expeditions/controller/expeditions_controller";
import PeakClimbingsController from "./peak climbings/controller/peakClimbings_controller";
import AboutUsController from "./about/controller/aboutUs_controller";
import MenusController from "./menu/controller/menus_controller";
import FaqTitlesController from "./faq titles/controller/faqTitles_controller";
import TopRatedPackagesController from "./topRated_packages/controller/topRatedPackages_controller";
import ReviewsController from "./reviews/controller/reviews_controller";
import BlogsController from "./blogs/controller/blogs_controller";
import FaqController from "./faq/controller/faq_controller";
import TrendingPackagesController from "./trending packages/controller/trendingPackages_controller";
import VehicleController from "./vehicle/controller/vehicles_controller";

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
          <Route path="peakClimbings" element={<PeakClimbingsController />} />
          <Route path="adventures" element={<AdventuresView />} />
          <Route path="menu" element={<MenusController />} />
          <Route path="faqtitles" element={<FaqTitlesController />} />
          <Route path="top-Rated-Packages" element={<TopRatedPackagesController />} />
          <Route path="trending-packages" element={<TrendingPackagesController />} />
          <Route path="reviews" element={<ReviewsController />} />
          <Route path="blogs" element={<BlogsController />} />
          <Route path="peakClimbings" element={<PeakClimbingsController />} />
          <Route path="adventures" element={<AdventuresView />} />
          <Route path="faqs" element={<FaqController />} />
          <Route path="/about" element={<AboutUsController />} />
          <Route path="/vehicles" element={<VehicleController />} />
          <Route path="/contact" element={<ContactView />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
