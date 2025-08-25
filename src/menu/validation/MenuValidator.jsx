export const MenuValidator = (formData) => {
    if(!formData.title || !formData.order){
        return { valid: false, message: "All fields are required!"}
    }
    if(formData.title.trim().length > 25){
        return { valid: false, message: "Title must be 25 characters or fewer."}
    }
    return { valid: true}
}