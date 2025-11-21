export const valildateForm = (formData) => {
    if(!formData.tripStartDate) {
        return { valid: false, message: "Trip start date is required"}
    }
    if(!formData.fullname) {
        return { valid: false, message: "Full name is required"}
    }

     if(formData.fullname && formData.fullname > 30 ) {
        return { valid: false, message: "Full name can be up 30 chars only"}
    }
    if(!formData.emailAddress) {
        return { valid: false, message: "Email is required"}
    }
     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(emailAddress && !emailAddress.match(emailPattern)) {
        return { valid: false, message: "Invalid email format"}
    }


      if(!formData.country) {
        return { valid: false, message: "Country is required"}
    }
      if(!formData.contactNumber) {
        return { valid: false, message: "Contact number is required"}
    }

    // if(formData.contactNumber && !formData.includes(0 || 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9)) {
    //     return { valid: false, message: "Invalid contact number"}
    // }

    return true;
}