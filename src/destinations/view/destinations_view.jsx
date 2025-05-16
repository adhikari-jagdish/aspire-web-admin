import { Title } from "@mantine/core";
import CustomBookingsTable from "../../customer_bookings/view/customer_bookings_table";
import { IconPlus } from "@tabler/icons-react";

const DestinationsView = ({ columns, destinations, handleClick }) => {
    return (
        <>
            <button
                onClick={handleClick}
                className="fixed bottom-15 right-6 bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-800 hover:cursor-pointer transition-colors duration-200 z-50 duration-200 z-50"
                aria-label="Add new item"
            >
                <IconPlus size={24} stroke={2} />
            </button>
            <div style={{ padding: "16px" }}>
                <Title order={3} mt={20} mb={10} ta="left" c="dark">
                    Destinations
                </Title>
                <CustomBookingsTable columns={columns} data={destinations} shouldShowDelete={true} shouldShowEdit={true} />
            </div>


        </>
    )
}

export default DestinationsView