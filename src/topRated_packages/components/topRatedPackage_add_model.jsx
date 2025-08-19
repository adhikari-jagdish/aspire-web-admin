import { Button, Modal, Group, Select } from "@mantine/core";
import { useEffect, useState } from "react";

const TopRatedPackagesAddModel = ({
  opened,
  onClose,
  handleSubmit,
  packageList = [],
}) => {
  const [selectedPackage, setSelectedPackage] = useState('');

  useEffect(() => {
    if(!opened){
      setSelectedPackage('');
    }
  }, [opened]);

  const onSubmit = () => {
    if(selectedPackage){
      handleSubmit(selectedPackage);
    }
  };

  const handleSelect = (value) => {

    if (selectedPackage !== value) {
      setSelectedPackage(value);
    }
  };
console.log({selectedPackage})
  const showSelectedTitle = packageList.filter((t) =>t._id === selectedPackage);

  const packages = packageList.map(({_id, title}) => ({
    value: _id,
    label: title
  }))


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
          <Select
          placeholder="Select Top Rated Package"
            className="rounded p-2 w-100"
            onChange={handleSelect}
            data={packages}
            searchable
            nothingFoundMessage="No Match"
            styles={{
            input: {
              height: "42px",
              borderColor: "#4B5563",
            },
            dropdown: {
              borderColor: "#4B5563",
            },
          }}

          />

          <div className=" rounded p-2 bg-green-100 flex flex-col gap-2">
            {selectedPackage !== "" ? (
              <>
                <h4 className="font-medium text-xl">
                  Selected Top Rated Package
                </h4>
                <ul className="pl-4">
                  {showSelectedTitle.map(({ _id, title }) => (
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
