import { Title } from "@mantine/core";
import CustomBookingsTable from "../../customer_bookings/view/customer_bookings_table";

const DestinationsView = ({ columns, destinations }) => {
    return (
        <>

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