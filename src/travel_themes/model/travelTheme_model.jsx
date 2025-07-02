class TravelThemeModel {
  constructor(title, image) {
    (this.title = title),
      (this.image = image);
  }

  toJson() {
    return {
      title: this.title,
      image: this.image,
    };
  }

  static fromJson(json) {
    return new TravelThemeModel(
      json._id,
      json.title,
      json.image,
      json.createdAt,
      json.updatedAt
    );
  }
}
