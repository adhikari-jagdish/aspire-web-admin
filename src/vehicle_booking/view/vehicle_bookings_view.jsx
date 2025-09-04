import { Title } from "@mantine/core";
import CustomTable from "../../common/common_view_components/custom_table";

const VehicleBookingsView = ({
  columns,
  bookings,
  onEditButtonClick,
  onDeleteButtonClick,
  onViewButtonClick,
}) => {
  return (
    <>
      <div style={{ padding: "16px" }}>
        <Title order={3} mt={20} mb={10} ta="left" c="dark">
          Vehicle Bookings
        </Title>

        <CustomTable
          columns={columns}
          data={bookings}
          shouldShowDelete={true}
          shouldShowEdit={true}
          onEdit={(item) => onEditButtonClick(item)}
          onDelete={(item) => onDeleteButtonClick(item)}
          onView={(item) => onViewButtonClick(item)}
        />
      </div>
    </>
  );
};

export default VehicleBookingsView;
