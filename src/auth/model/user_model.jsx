class UserModel {
  constructor(
    fullName,
    mobileNumber,
    countryCode,
    email,
    isVerified,
    userType,
    image,
    role,
    createdAt,
    updatedAt
  ) {
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

  static fromJson(json) {
    return new UserModel(
      json._id || null,
      json.fullName || "",
      json.mobileNumber || "",
      json.countryCode || "",
      json.email || "",
      json.isVerified || false,
      json.userType || "",
      json.image || "",
      json.role || "",
      json.createdAt || null,
      json.updatedAt || null
    );
  }
}

export default UserModel;
