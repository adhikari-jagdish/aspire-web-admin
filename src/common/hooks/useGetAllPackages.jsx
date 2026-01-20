import PackageRepository from "../package/package_repository";


export const useGetAllPackages = async (token) => {

  const packageRepository = new PackageRepository(token);

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
      safe(packageRepository.getPackagesByType("Tour")),
      safe(packageRepository.getPackagesByType("Trekking")),
      safe(packageRepository.getPackagesByType("Expedition")),
      safe(packageRepository.getPackagesByType("PeakClimbing")),
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
