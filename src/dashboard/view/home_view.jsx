import { SimpleGrid, Title } from "@mantine/core";
import CustomCard from "../../common/common_view_components/custom_card";
import CustomBookingsTable from "../../customer_bookings/view/customer_bookings_table";

const HomeView = () => {

     const columns = [
        { label: "Travelling Date", accessor: "travellingDate" },
        { label: "Client Name", accessor: "clientName" },
        { label: "Package Name", accessor: "packageName" },
        { label: "Adults", accessor: "adults" },
        { label: "Children", accessor: "children" },
    ];

    const myData = [
        {
            id: 1,
            travellingDate: "2025-09-01",
            clientName: "Bob Wilson",
            packageName: "Jungle Safari",
            adults: 2,
            children: 3,
        },
        {
            id: 2,
            travellingDate: "2025-10-20",
            clientName: "Emma Brown",
            packageName: "Cultural Tour",
            adults: 1,
            children: 0,
        },
        {
            id: 3,
            travellingDate: "2025-10-25",
            clientName: "Rohit Kawang",
            packageName: "Leisure Tour",
            adults: 5,
            children: 2,
        },
        {
            id: 4,
            travellingDate: "2025-10-29",
            clientName: "Samir Maskey",
            packageName: "Cultural Tour",
            adults: 1,
            children: 2,
        },
        {
            id: 5,
            travellingDate: "2025-10-30",
            clientName: "Ram Acharya",
            packageName: "Cultural Tour",
            adults: 1,
            children: 2,
        },

        {
            id: 5,
            travellingDate: "2025-10-30",
            clientName: "Ram Acharya",
            packageName: "Cultural Tour",
            adults: 1,
            children: 2,
        },
    ];


    return (
        <>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
                <CustomCard title="Tours" value={50} color="cyan" />
                <CustomCard title="Trekking" value={20} color="cyan" />
                <CustomCard title="Expedition" value={45} color="pink" />
                <CustomCard title="Peak Climbing" value={3} color="red" />
            </SimpleGrid>



            <div style={{ padding: "16px" }}>
                <Title order={3} mt={20} mb={10} ta="left" c="dark">
                    Latest Bookings
                </Title>
                <CustomBookingsTable columns={columns} data={myData} />
            </div>
        </>
    );
}

export default HomeView;