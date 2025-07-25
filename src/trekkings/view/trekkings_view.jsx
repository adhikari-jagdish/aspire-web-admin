import { Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import PropTypes from "prop-types";
import CustomTable from "../../common/common_view_components/custom_table";

const TrekkingsView = ({
  columns,
  trekkings,
  handleClick,
  onEditButtonClick,
  onDeleteButtonClick,
  onViewButtonClick,
  destinationList,
  travelThemeList
}) => {
  return (
    <>
      <button
        onClick={handleClick}
        className="fixed bottom-15 right-6 bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-800 hover:cursor-pointer transition-colors duration-200 z-50"
        aria-label="Add new item"
      >
        <IconPlus size={24} stroke={2} />
      </button>
      <div className="p-4">
        <Title order={3} mt={20} mb={10} ta="left" c="dark">
          Trekkings
        </Title>
        <CustomTable
          columns={columns}
          data={trekkings}
          shouldShowDelete
          shouldShowEdit
          onEdit={onEditButtonClick}
          onDelete={onDeleteButtonClick}
          onView={onViewButtonClick}
          destinationList={destinationList}
          travelThemeList={travelThemeList}
        />
      </div>
    </>
  );
};

TrekkingsView.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  trekkings: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddButtonClick: PropTypes.func.isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  onViewButtonClick: PropTypes.func.isRequired,
};

export default TrekkingsView;
