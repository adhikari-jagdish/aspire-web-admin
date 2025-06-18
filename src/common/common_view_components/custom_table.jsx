import { Table, ScrollArea, Box, Button, Group } from "@mantine/core";
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";

const CustomTable = ({
  columns = [],
  data = [],
  onView,
  onEdit,
  onDelete,
  shouldShowEdit = false,
  shouldShowDelete = false,
}) => {
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
              {safeColumns.map((col) => {
                return <Table.Th
                  key={col.accessor}
                  style={{ backgroundColor: "#f1f3f5" }}
                >
                  {col.label}
                </Table.Th>
              })} 
              <Table.Th style={{ backgroundColor: "#f1f3f5", width: "210px" }}>
                Actions
              </Table.Th>
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
              data.map((item, index) => {

                 return <Table.Tr
                  key={item._id || index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <Table.Td>{index + 1}</Table.Td>
                  {safeColumns.map((col) => {
                   return <Table.Td key={col.accessor}>
                      {col.accessor === "image" ? (
                        <img
                          src={item[col.accessor]}
                          alt={index + 1}
                          style={{
                            width: "80px",
                            height: "60px",
                            objectFit: "cover",
                          }}
                        />
                      ) :
                      col.accessor === 'rate' ? <div>
                        {item[col.accessor].map((rateItem, idx) => (
                          <ul key={idx} className="w-[300px]">
                          <li className="list-disc font-medium">{rateItem.roomCategory}</li>
                          <li>
                            NPR: {rateItem.rateInNPR} | USD: {rateItem.rateInUSD} | INR: {rateItem.rateInINR} |
                             BDT: {rateItem.rateInBDT}
                          </li>
                          </ul>
                        ))}
                      </div>  : (
                        col.accessor === "destinationId"? <span className="w-[250px]">{item[col.accessor]}</span>:
                        <span className="line-clamp-3 overflow-hidden">
                          {item[col.accessor]}
                        </span>
                      )
                       }
                    </Table.Td>
                  })}
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
            })
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Box>
  );
};

export default CustomTable;
