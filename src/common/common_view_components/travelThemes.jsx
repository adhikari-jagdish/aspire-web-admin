import { useEffect, useState } from "react";
import TravelThemeRepository from "../../travel_themes/repository/travelTheme_repository";
import { Title } from "@mantine/core";
import useAuth from "../../auth/components/use_auth";
import { useNotification } from "../hooks/useNotification";

const TravelThemes = ({ name, value, onChange }) => {
  const [travelThemeList, setTravelThemeList] = useState([]);
  const [selectedTravelThemes, setSelectedTravelThemes] = useState([]);
  const { getToken } = useAuth();
  const notify = useNotification();
  const travelThemeRepository = new TravelThemeRepository(getToken);

  const purifiedTravelThemeIds = value && value?.map(v => v?._id);
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

  const handleChange = (id) => {
    const updated = value.includes(id)
      ? value.filter((v) => v !== id)
      : [...value, id];
      setSelectedTravelThemes(updated)

    onChange({ target: { name, value: updated } });
  };
  return (
    <div>
      <Title
        order={4}
        mt={20}
        mb={10}
        ta="left"
        c="dark"
        className="flex flex-col"
      >
        Travel Themes
      </Title>

      <ul className="flex gap-5 font-normal  pl-2 flex-wrap">
        {travelThemeList?.map((t, idx) => {
          const inputId = `destination-${t?._id || idx}`;
          return (
            <li className="space-x-2 flex items-center justify-center " key={t?._id || idx}>
              <input
                type="checkbox"
                id={inputId}
                name="travelThemeId"
                className="w-4 h-4 mr-1 cursor-pointer"
                checked={purifiedTravelThemeIds?.includes(t?._id) || selectedTravelThemes.includes(t?._id)}
                value={t?._id}
                onChange={() => handleChange(t?._id)}
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
