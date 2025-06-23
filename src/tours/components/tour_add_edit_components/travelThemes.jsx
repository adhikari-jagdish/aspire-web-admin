import { useEffect, useState } from "react";
import TravelThemeRepository from "../../../travel themes/repository/travelTheme_repository";
import { Title } from "@mantine/core";
import useAuth from "../../../auth/components/use_auth";
import { useNotification } from "../../../common/hooks/useNotification";

const TravelThemes = () => {
  const [travelThemeList, setTravelThemeList] = useState([]);
  const { getToken } = useAuth();
const notify = useNotification();
  

  const travelThemeRepository = new TravelThemeRepository(getToken);

  useEffect(() => {
    //get all travel themes
    const fetchTravelThemes = async () => {
      try {
        const travelThemeResponse =
          await travelThemeRepository.getTravelThemes();
        setTravelThemeList(travelThemeResponse.data);
      } catch (error) {
        notify({
          type: "error",
          message: error.message ?? "Something went wrong. Please try again.",
        });
      }
    };
    fetchTravelThemes();
  }, []);
  return (
    <div className="p-2">
      <Title
        order={4}
        mt={20}
        mb={10}
        ta="left"
        c="dark"
        className="flex flex-col"
      >
        Travel Themes
        <span className=" border border-b-1 w-[125px]"></span>
      </Title>

      <ul className="flex gap-5 font-normal  pl-2 flex-wrap">
        {travelThemeList?.map((t, idx) => {
          const inputId = `destination-${t?._id || idx}`;
          return (
            <li className="space-x-2 " key={t?._id || idx}>
              <input
                type="checkbox"
                id={inputId}
                name="destination"
                className="w-4 h-4 mr-1 cursor-pointer"
              />
              <label htmlFor={inputId} className="cursor-pointer">
                {t?.title}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TravelThemes;
