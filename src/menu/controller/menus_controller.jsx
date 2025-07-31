import MenuAddEditModel from "../components/menu_add_edit_model";
import { useEffect, useState } from "react";
import useAuth from "../../auth/components/use_auth";
import { useNotification } from "../../common/hooks/useNotification";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
import MenusView from "../view/menus_view";
import MenuRepository from "../repository/menu_repository";
import MenuViewModel from "../components/menu_view_model";

const MenusController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [menuList, setMenuList] = useState([]);
  const [menu, setMenu] = useState({});
  const { getToken } = useAuth();
  const [file, setFile] = useState(null);
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const [isEditMenu, setIsEditMenu] = useState(false);
  const [isDeleteMenu, setIsDeleteMenu] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [parentId, setParentId] = useState("");

  const menuRepository = new MenuRepository(getToken);


  useEffect(() => {
    const fetchMenus = async () => {
      try {
        showLoading();
        const menusResponse =
          await menuRepository.getMenus();
        setMenuList(menusResponse.data);
      } catch (err) {
        notify({
          type: "error",
          message: err.message ?? "Something went wrong. Please try again.",
        });
      } finally {
        hideLoading();
      }
    };
    fetchMenus();
  }, []);
  const handleClick = (modalTitle, parent) => {
    console.log({parent})
    setModalTitle(modalTitle)
    setModalOpen(true);
    console.log({parent})
    setParentId(parent?._id);
  };
  //Function to trigger when edit button is clicked
  const handleEditButtonClick = (item) => {
    setIsEditMenu(true);
    setMenu(item);
    setModalOpen(true);
    setIdToUpdate(item?._id);
  };

  const onDeleteButtonClick = (item) => {
    setIsDeleteMenu(true);
    setIdToDelete(item?._id);
  };
  const handleDeleteButtonClick = async () => {
    try {
      await menuRepository.deleteMenu(idToDelete);
      showLoading();
      notify({ type: "success", message: "Menu Item deleted successfully." });
      const updatedMenu = await menuRepository.getMenus();
      setMenuList(updatedMenu.data);
    } catch (err) {
      notify({
        type: "error",
        message: err.message ?? "Failed to delete Menu.",
      });
    } finally {
      hideLoading();
    }
  };



  const handleSubmit = async (formData) => {
    
    showLoading();
    // const fD = new FormData();
    // fD.append("title", formData.title);
    // fD.append("order", formData.order)
    try {
      let responseMessage;
      let response;
     if(isEditMenu){
       response = await menuRepository.updateMenu(fD,idToUpdate);
       setMenuList(prev => prev.map(item => item._id === idToUpdate ? {...item, title} : item));
     } else {
        response = await menuRepository.addMenu(formData);
        const updatedMenu = await menuRepository.getMenus();
        setMenuList(updatedMenu.data)
     }
       responseMessage = response.message;

      setModalOpen(false);
      notify({
        type: "success",
        message: responseMessage,
      });
    } catch (err) {
      notify({
        type: "error",
        message: err.message ?? "Something went wrong. Please try again.",
      });
    } finally {
      hideLoading();
    }

  };
  const handleViewButtonClick = (item) => {
    setOpenedView(true);
    setMenu(item);
  };


  return (
    <>
      <MenusView
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        menus={menuList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
      />

      <MenuViewModel
        openedView={openedView}
        onClose={() => {
          setOpenedView(false);
        }}
        menu={menu}
      />
      <MenuAddEditModel
        opened={modalOpen}
        onClose={() => {
          setIsEditMenu(false);
          setModalOpen(false);
        }}
        handleSubmit={handleSubmit}
        isEditMenu={isEditMenu}
        menu={menu}
        modalTitle={modalTitle}
        parentId={parentId}
      />

      <CustomDialogModal
        opened={isDeleteMenu}
        onClose={() => setIsDeleteMenu(false)}
        title="Alert!!"
        message="Are you sure you want to delete?"
        onConfirm={handleDeleteButtonClick}
      />

      <LoadingOverlayComponent />
    </>
  );
};

export default MenusController;
