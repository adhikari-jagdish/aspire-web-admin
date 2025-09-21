export const HotelValidator = (formData, image) => {
    console.log(formData)
  if (
    !formData.destinationId ||
    !formData.title ||
    !formData.city ||
    !formData.rating ||
    !formData.overview ||
    !formData.hotelCategory ||
    (!formData.rate && !isEditHotel)
  ) {
  
      return { valid: false, message: "All fields are required."}
  }

  if (!image) {
      return { valid: false, message: "Image is required."}
  }
  if (formData.title.trim().length > 500) {
      return { valid: false, message: "Title must be 500 characters or fewer."}
  }

  if (formData.city.trim().length > 35) {
      return { valid: false, message: "City must be 35 characters or fewer."}
  }

  if (formData.rating.length > 2) {
      return { valid: false, message: "Rating must 1 digits or decimal."}
  }

  if (formData.overview.trim().length > 50) {
      return { valid: false, message: "Overview must 50 characters or fewer."}
  }


  for (let item of formData.rate) {
    if (item.roomCategory.trim().length > 40) {
        return { valid: false, message: "Room category must 40 characters or fewer."}
    }
  }
  return { valid: true}
};
