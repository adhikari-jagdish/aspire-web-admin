class UserModel {
    constructor(_id, fullName, mobileNumber, countryCode, email, isVerified, userType, image, role, createdAt, updatedAt) {
        this._id = _id;
        this.fullName = fullName;
        this.mobileNumber = mobileNumber;
        this.countryCode = countryCode;
        this.email = email;
        this.isVerified = isVerified;
        this.userType = userType;
        this.image = image;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    toJson() {
        return {
            fullName: this.fullName,
            mobileNumber: this.mobileNumber,
            countryCode: this.countryCode,
            email: this.email,
            isVerified: this.isVerified,
            userType: this.userType,
            image: this.image,
            role: this.role
        };
    }


    static fromJson(json) {
        return new UserModel(json._id, json.fullName, json.mobileNumber, json.countryCode, json.email, json.isVerified, json.userType, json.image, json.role, json.createdAt, json.updatedAt,);
    }
}

export default UserModel;