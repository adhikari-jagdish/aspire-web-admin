class DestinationModel {
  constructor(title, description, image) {
    (this.title = title),
      (this.description = description),
      (this.image = image);
  }

  toJson() {
    return {
      title: this.title,
      description: this.description,
      image: this.image,
    };
  }

  static fromJson(json) {
    return new DestinationModel(
      json._id,
      json.title,
      json.description,
      json.image,
      json.createdAt,
      json.updatedAt
    );
  }
}
