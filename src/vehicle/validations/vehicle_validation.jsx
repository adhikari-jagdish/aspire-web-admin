export const VehicleValidator = (formData, image, isEditVehicle) => {
  const trimmedTitle = formData.title.trim();
  const trimmedDescription = formData.description.trim();
  if (
    trimmedTitle === "" ||
    trimmedDescription === "" ||
    formData.priceFrom === "" ||
    (!image && !isEditVehicle)
  ) {
    return { valid: false, message: "All fields are required!" };
  }

  if (trimmedTitle.length > 25) {
    return { valid: false, message: "Title must be 25 characters or fewer." };
  }

  if (trimmedDescription.length > 500) {
    return {
      valid: false,
      message: "Description must be 500 characters or fewer.",
    };
  }
  return { valid: true };
};
