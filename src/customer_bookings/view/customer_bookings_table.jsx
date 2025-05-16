import { Table, ScrollArea, Box, Button, Group } from "@mantine/core";
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";

const CustomTable = ({ columns = [], data = [], onView, onEdit, onDelete, shouldShowEdit = false, shouldShowDelete = false }) => {
    const safeColumns = Array.isArray(columns) ? columns : [];

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
                            {safeColumns.map((col) => (
                                <Table.Th key={col.accessor} style={{ backgroundColor: "#f1f3f5" }}>
                                    {col.label}
                                </Table.Th>
                            ))}
                            <Table.Th style={{ backgroundColor: "#f1f3f5", width: "210px" }}>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {data.length === 0 ? (
                            <Table.Tr>
                                <Table.Td colSpan={safeColumns.length + 2} align="center">
                                    No data available.
                                </Table.Td>
                            </Table.Tr>
                        ) : (
                            data.map((item, index) => (
                                <Table.Tr key={item.id || index} className="hover:bg-gray-50 transition-colors">
                                    <Table.Td>{index + 1}</Table.Td>
                                    {safeColumns.map((col) => (
                                        <Table.Td key={col.accessor}>{item[col.accessor]}</Table.Td>
                                    ))}
                                    <Table.Td>
                                        <Group spacing="xs">
                                            <Button
                                                size="xs"
                                                color="blue"
                                                variant="subtle"
                                                onClick={() => onView?.(item)}
                                            >
                                                <IconEye size={16} />
                                            </Button>
                                            {shouldShowEdit ? (
                                                <Button
                                                    size="xs"
                                                    color="orange"
                                                    variant="subtle"
                                                    onClick={() => onEdit?.(item)}
                                                >
                                                    <IconPencil size={16} />
                                                </Button>
                                            ) : (
                                                <></> // Or nothing or any fallback like <span>-</span>
                                            )}

                                            {shouldShowDelete ? (
                                                <Button
                                                    size="xs"
                                                    color="red"
                                                    variant="subtle"
                                                    onClick={() => onDelete?.(item)}
                                                >
                                                    <IconTrash size={16} />
                                                </Button>
                                            ) : (
                                                <></> // Or nothing or any fallback like <span>-</span>
                                            )}


                                        </Group>
                                    </Table.Td>
                                </Table.Tr>
                            ))
                        )}
                    </Table.Tbody>
                </Table>
            </ScrollArea>
        </Box>
    );
};

export default CustomTable;
