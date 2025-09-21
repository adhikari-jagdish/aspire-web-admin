export const FieldValidator = (formData, image, mapImage, isMapImage) => {
  if (
    !formData.destinationIds ||
    !formData.travelThemeIds ||
    !formData.title ||
    !formData.duration ||
    !formData.overview ||
    !formData.tripHighlights ||
    !formData.itinerary ||
    !formData.inclusions ||
    !formData.exclusions ||
    !formData.hotels ||
    !formData.packageRate ||
    !formData.discountInPercentage
  ) {
    return { valid: false, message: "All fields are required." };
  }
  if (formData.title.trim().length > 150) {
    return { valid: false, message: "Title must be 150 characters or fewer." };
  }
  if (formData.overview.trim().length > 5000) {
    return {
      valid: false,
      message: "Overview must be 5000 characters or fewer.",
    };
  }

  if (formData.inclusions.trim().length > 5000) {
    return {
      valid: false,
      message: "Inclusions must be 5000 characters or fewer.",
    };
  }
  if (formData.exclusions.trim().length > 5000) {
    return {
      valid: false,
      message: "Exclusions must be 5000 characters or fewer.",
    };
  }
  if (!image && !formData.image) {
    return { valid: false, message: "Image is required" };
  }
 if (!mapImage && ( isMapImage && !formData.mapImage)) {
    return { valid: false, message: "Map image is required" };
  }
  for (let item of formData.tripHighlights) {
    if (item.description.trim().length > 5000) {
      return {
        valid: false,
        message: "Trip highlights description must be 5000 characters or fewer.",
      };
    }
  }

  if (!formData.itinerary.length > 0) {
  
      return { valid: false, message: "Please add itinerary!"}
 
  }

  for (let item of formData.itinerary) {
     if (item.dayAndTitle.trim().length > 60) {
      
       return { valid: false,  message: "Itineray title must be 60 characters or fewer."}
    
    }

   for(let fact of item.itineraryFactors) {
    if(fact.details.trim().length > 20) {
      return { valid: false, message: "Itinerary facts details must be 20 characters or fewer."}
    }
   }
    if (item.details.trim().length > 5000) {
      
       return { valid: false,  message: "Itinerary details must be 5000 characters or fewer."}
    
    }
  }


  return { valid: true}
};
