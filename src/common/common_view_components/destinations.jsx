import DestinationRepository from "../../destinations/repository/destination_repository";
import useAuth from "../../auth/components/use_auth";
import { useEffect, useState } from "react";
import { Title } from "@mantine/core";
import { useNotification } from "../hooks/useNotification";

const Destinations = ({ name, value, onChange}) => {
  const [destinationList, setDestinationList] = useState([]);
  const { getToken } = useAuth();
  const notify = useNotification();

const purifiedDestinationIds = value && value?.map(v => v._id);

  const destinationRepository = new DestinationRepository(getToken);
  useEffect(() => {
    //get all destinations
    const fetchDestinations = async () => {
      try {
        const destinationResponse =
          await destinationRepository.getDestinations();
        setDestinationList(destinationResponse.data);
      } catch (error) {
        notify({
          type: "error",
          message: error.message ?? "Something went wrong. Please try again.",
        });
      }
    };
    fetchDestinations();
  }, []);

  const handleChange  = (id) => {
    const updated = value?.includes(id)? value.filter(v => v !== id): [...value, id];

    onChange({target: {name, value: updated}})
  }
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
        Destinations
      </Title>

      <ul className="flex gap-5 font-normal  pl-2 flex-wrap">
        {destinationList?.map((d, idx) => {
          const inputId = `destination-${d?._id || idx}`;
          return (
            <li className="space-x-2 flex items-center justify-center " key={d?._id || idx}>
              <input
                type="checkbox"
                id={inputId}
                name="destinationId"
                className="w-4 h-4 mr-1 cursor-pointer"
                value={d?._id}
                checked={purifiedDestinationIds?.includes(d?._id)}
                onChange={() => handleChange(d?._id)}
              />
              <label htmlFor={inputId} className="cursor-pointer">
                {d?.title}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Destinations;
