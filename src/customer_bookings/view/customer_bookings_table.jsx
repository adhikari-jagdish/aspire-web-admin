import { Table, ScrollArea, Box } from "@mantine/core";

const CustomBookingsTable = ({ data }) => {
    const rows = data.map((item, index) => (
        <Table.Tr key={item.id} className="hover:bg-gray-50 transition-colors">
            <Table.Td>{index + 1}</Table.Td>
            <Table.Td>{item.travellingDate}</Table.Td>
            <Table.Td>{item.clientName}</Table.Td>
            <Table.Td>{item.packageName}</Table.Td>
            <Table.Td>{item.adults}</Table.Td>
            <Table.Td>{item.children}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Box
            style={{
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: 8,
                overflow: "hidden",
            }}
        >
            <ScrollArea>
                <Table
                    horizontalSpacing="md"
                    verticalSpacing="sm"
                    withBorder
                    withColumnBorders
                    className="bg-white"
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th style={{ backgroundColor: "#f1f3f5" }}>SN</Table.Th>
                            <Table.Th style={{ backgroundColor: "#f1f3f5" }}>
                                Travelling Date
                            </Table.Th>
                            <Table.Th style={{ backgroundColor: "#f1f3f5" }}>
                                Name of Client
                            </Table.Th>
                            <Table.Th style={{ backgroundColor: "#f1f3f5" }}>
                                Name of Package
                            </Table.Th>
                            <Table.Th style={{ backgroundColor: "#f1f3f5" }}>
                                No of Adult
                            </Table.Th>
                            <Table.Th style={{ backgroundColor: "#f1f3f5" }}>
                                No of Children
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>
        </Box>
    );
};

export default CustomBookingsTable;