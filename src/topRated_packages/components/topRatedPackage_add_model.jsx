import { Button, Modal, Group } from "@mantine/core";
import { useEffect, useState } from "react";

const TopRatedPackagesAddModel = ({
  opened,
  onClose,
  handleSubmit,
  packageList = [],
}) => {
  const [selectedPackages, setSelectedPackages] = useState([]);

  useEffect(() => {
    setSelectedPackages([]);
  }, [onClose]);

  const onSubmit = () => {
    handleSubmit(selectedPackages);
  };

  const handleSelect = (e) => {
    const packageId = e.target.value;

    if (!selectedPackages.includes(packageId)) {
      setSelectedPackages((prev) => [...prev, e.target.value]);
    }
  };

  const showSelectedTitles = packageList.filter((t) =>
    selectedPackages.find((sp) => t._id === sp)
  );

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={"Add Top Rated  Packages"}
      size="xl"
      centered
      padding="lg"
      radius="md"
      styles={{
        title: {
          fontSize: "34px",
          color: "#0890cf",
          fontWeight: 700,
        },
        content: {
          scrollbarWidth: "none",
        },
      }}
    >
      <div className="text-[15px]">
        <div className="flex items-center gap-10">
          <select
            className="border rounded p-2 w-100"
            onChange={(e) => handleSelect(e)}
          >
            <option value="">Select Top Rated Packages</option>
            {packageList.map(({ _id, title }) => (
              <option value={_id}>{title}</option>
            ))}
          </select>

          <div className=" rounded p-2 bg-green-100 flex flex-col gap-2">
            {selectedPackages.length > 0 ? (
              <>
                <h4 className="font-medium text-xl">
                  Selected Top Rated Packages
                </h4>
                <ul className="pl-4">
                  {showSelectedTitles.map(({ _id, title }) => (
                    <li key={_id} className="list-decimal">
                      {title}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <span>No Packages Selected Yet!</span>
            )}
          </div>
        </div>
        {/* Sticky Button inside Modal */}
        {/* <div className="sticky bottom-2  z-[90] flex justify-end  pb-2 bg-white">
            <button onClick={() => {
              const modalBody = document.querySelector('.mantine-Modal-content');
              if(modalBody){
                modalBody.scrollTo({top: 0, behavior: "smooth"})
              }
            }} className="bg-blue-600 rounded-full p-2 shadow-md cursor-pointer hover:bg-blue-700">
              <FaAngleUp size={25} color="white" />
            </button>
          </div> */}
        <Group position="right" mt="md" pr={10} pb={4} spacing="sm">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>Submit</Button>
        </Group>
      </div>
    </Modal>
  );
};

export default TopRatedPackagesAddModel;
