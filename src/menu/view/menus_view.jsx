import { IconPlus, IconTrash } from "@tabler/icons-react";
import CustomTable from "../../common/common_view_components/custom_table";
import { Button, Title } from "@mantine/core";
import { useState } from "react";

const MenusView = ({
  columns,
  handleClick,
  onEditButtonClick,
  onDeleteButtonClick,
  onViewButtonClick,
  menus,
}) => {
  console.log({ menus });
  return (
    <>
      <div className="fixed bottom-15 right-6 flex items-center gap-2 ">
        <button
          onClick={() => handleClick("Menu Item")}
          className=" bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-800 hover:cursor-pointer transition-colors duration-200 z-50"
          aria-label="Add new item"
        >
          <IconPlus size={24} stroke={2} />
        </button>
        <span className="text-xl font-bold">Add Menu</span>
      </div>

      <div className="max-w-[900px] p-[16px]">
        <Title order={4} mt={20} mb={10} ta="left" c="dark">
          Menu Items
        </Title>
        {/* <CustomTable
          columns={columns}
          data={menus}
          shouldShowDelete={true}
          shouldShowEdit={true}
          onEdit={(item) => onEditButtonClick(item)}
          onDelete={(item) => onDeleteButtonClick(item)}
          onView={(item) => onViewButtonClick(item)}
        /> */}
        <div className="space-y-6">
          {menus?.map((menu, idx) => (
            <div className="flex flex-col border border-gray-400 rounded p-2 shadow-lg">
              <div>
                <div className="flex gap-6 border-b-2 w-fit pb-2 border-blue-300 text-sm">
                  <h1 className="font-bold text-sm">
                    {idx + 1}. Menu: <span>{menu.title}</span>
                  </h1>
                  <button
                    onClick={() => handleClick("Sub Menu Item", menu)}
                    className="bg-blue-600 text-white  rounded  px-4 py-1 flex items-center justify-center shadow-lg hover:bg-blue-800 hover:cursor-pointer transition-colors duration-200 "
                  >
                    Add Sub Menu
                  </button>
                  <Button
                    size="xs"
                    color="red"
                    variant="subtle"
                    style={{ border: "1px solid #e03131" }}
                    onClick={() => onDeleteButtonClick?.(menu)}
                  >
                    <IconTrash size={16} />
                  </Button>
                </div>
              </div>
              <div className="ml-4 mt-4 space-y-5 text-[13px]">
                <div className="flex gap-6">
                  <h2 className="font-semibold">Sub Menus</h2>
                </div>
                <div className="border border-gray-400 shadow-lg p-2 rounded space-y-4  ">
                  {menu?.children?.length > 0 ? (
                    menu?.children?.map((subMenu, subIdx) => (
                      <>
                        <div className="flex gap-4 items-center">
                          <h3>
                            {subIdx + 1}. {subMenu.title}
                          </h3>
                            <button
                              onClick={() => handleClick("Link Item", subMenu)}
                              className="bg-blue-600 text-white  rounded  px-4 py-1  flex items-center justify-center shadow-lg hover:bg-blue-800 hover:cursor-pointer transition-colors duration-200 "
                            >
                              Add Link
                            </button>
                            <Button
                              size="xs"
                              color="red"
                              variant="subtle"
                              style={{ border: "1px solid #e03131" }}
                              onClick={() => onDeleteButtonClick?.(subMenu)}
                            >
                              <IconTrash size={16} />
                            </Button>
                        </div>
                        <div className="ml-8 mt-2">
                            <h2 className="font-medium">Links</h2>
                          <div className=" p-2 rounded w-fit bg-blue-50 shadow-lg mt-2 space-y-2">
                            {subMenu?.children.length > 0 ? (
                              subMenu?.children?.map((link, linkIdx) => (
                                <div className="flex gap-4 items-center">
                                  <h3>
                                    {linkIdx + 1}. {link.title}
                                  </h3>
                                  <Button
                                    size="xs"
                                    color="red"
                                    variant="subtle"
                                    style={{ border: "1px solid #e03131" }}
                                    onClick={() => onDeleteButtonClick?.(link)}
                                  >
                                    <IconTrash size={16} />
                                  </Button>
                                </div>
                              ))
                            ) : (
                              <span>No Links for this Sub Menu!</span>
                            )}
                          </div>
                        </div>
                      </>
                    ))
                  ) : (
                    <span className="z-40">No Sub Menus for this Menu!</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div>
          <span className="flex  justify-center text-2xl mt-45 font-semibold text-gray-500">
            No Menu Items yet!
          </span>
        </div> */}
      </div>
    </>
  );
};

export default MenusView;
