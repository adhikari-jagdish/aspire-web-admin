export const MenuValidator = (formData) => {
    if(!formData.title || !formData.order){
        return { valid: false, message: "All fields are required!"}
    }
    if(formData.title.trim().length > 150){
        return { valid: false, message: "Title must be 150 characters or fewer."}
    }
    return { valid: true}
}