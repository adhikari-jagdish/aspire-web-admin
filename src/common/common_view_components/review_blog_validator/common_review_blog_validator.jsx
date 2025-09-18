export const CommonReviewBlogValidator = (formData, tempDiv, image) => {
    const hasTitle = formData.title ?? formData.title;
  if (
    hasTitle?.trim().length === 0 ||
    formData.postedBy.trim().length === 0 ||
    tempDiv.textContent.trim().length === 0 
  ) {
      return { valid: false, message: "All fields are required!"}
  }
   if(!formData.postDate){
    return { valid: false, message: "Please select date."}
  }
  if(!image) {
    return { valid: false, message: "Image is required"}
  }
  if(formData.postedBy.trim().length > 25){
    return { valid: false, message: "Posted By must be 25 characters or fewer."}
  }
   if(tempDiv.textContent.trim().length > 5000){
    return { valid: false, message: "Description must be 5000 characters or fewer."}
  }
 

  return { valid: true}
};

