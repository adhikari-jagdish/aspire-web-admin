import ExpeditionRepository from "../../expeditions/repository/expedition_repository";
import PeakClimbingRepository from "../../peak climbings/repository/peakClimbing_repository";
import TourRepository from "../../tours/repository/tour_repository";
import TrekkingRepository from "../../trekkings/repository/trekking_repository";

export const useGetAllPackages = async (token) => {

  const tourRepository = new TourRepository(token);
  const trekkingRepository = new TrekkingRepository(token);
  const expeditionRepository = new ExpeditionRepository(token);
  const peakClimbingRepository = new PeakClimbingRepository(token);

  try {

    const safe = async (promise) => {
      try {
        return await promise;
      } catch (error) {
        console.warn("handled fetched errors: ", error?.message);
        return { data: [] };
      }
    };
    const [tours, trekkings, expeditions, peaks] = await Promise.all([
      safe(tourRepository.getTourPackages()),
      safe(trekkingRepository.getTrekkingPackages()),
      safe(expeditionRepository.getExpeditionPackages()),
      safe(peakClimbingRepository.getPeakClimbingPackages()),
    ]);

    const allPackages = [
      ...tours.data,
      ...trekkings.data,
      ...expeditions.data,
      ...peaks.data,
    ];

    const uniquePackages = Array.from(
      new Map(
        allPackages.map((pkg) => [pkg._id, { _id: pkg._id, title: pkg.title }])
      ).values()
    );

    return uniquePackages;
  } catch (error) {
    console.error("Unexpected error in getAllPackages:", error);
    return [];
  }
};
