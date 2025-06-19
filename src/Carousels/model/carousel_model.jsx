class CarouselModel {
  constructor(title, description, image, priority, screenPlaceType) {
    (this.title = title),
      (this.description = description),
      (this.image = image);
      (this.priority = priority);
      (this.screenPlaceType = screenPlaceType);
  }

  toJson() {
    return {
      title: this.title,
      description: this.description,
      image: this.image,
      priority: this.priority,
      screenPlaceType: this.screenPlaceType,
    };
  }

  static fromJson(json) {
    return new CarouselModel(
      json._id,
      json.title,
      json.description,
      json.image,
      json.priority,
      json.screenPlaceType,
      json.createdAt,
      json.updatedAt
    );
  }
}
