export const CarouselValidator = (formData, image) => {
    if(!formData.title || !formData.description || !formData.priority || !formData.screenPlaceType){
        return { valid: false, message: "All fields are required."}
    }
    if(!image){
        return { valid: false, message: "Image is required."}
    }
    if(formData.title.trim().length > 150){
        return { valid: false, message: "Title must be 150 characters or fewer."}
    }
     if(formData.description.trim().length > 500){
        return { valid: false, message: "Description must be 500 characters or fewer."}
    }
    if(formData.priority > 5 ){
        return { valid: false, message: "Priority must be betwenn 1-5"}
    }
    return { valid: true}
}