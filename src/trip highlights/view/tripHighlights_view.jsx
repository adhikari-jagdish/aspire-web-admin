import { IconPlus } from "@tabler/icons-react";
import CustomTable from "../../common/common_view_components/custom_table";
import { Title } from "@mantine/core";

const TripHighLightsView = ({
  columns,
  handleClick,
  onEditButtonClick,
  onDeleteButtonClick,
  onViewButtonClick,
  tripHighlights
}) => {
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
          Trip Highlights
        </Title>
        <CustomTable
          columns={columns}
          data={tripHighlights}
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

export default TripHighLightsView;
