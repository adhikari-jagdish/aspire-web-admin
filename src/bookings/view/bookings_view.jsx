import { Title } from "@mantine/core";
import CustomTable from "../../common/common_view_components/custom_table";
import { IconPlus } from "@tabler/icons-react";

const BookingsView = ({
  columns,
  bookings,
  handleClick,
  onEditButtonClick,
  onViewButtonClick
}) => {
  return (
    <>
     
      <div style={{ padding: "16px" }}>
        <Title order={3} mt={20} mb={10} ta="left" c="dark">
          Bookings
        </Title>
        <CustomTable
          columns={columns}
          data={bookings}
          shouldShowDelete={false}
          shouldShowEdit={true}
          onEdit={(item) => onEditButtonClick(item)}
          onView={item => onViewButtonClick(item)}
        />
      </div>
    </>
  );
};

export default BookingsView;
