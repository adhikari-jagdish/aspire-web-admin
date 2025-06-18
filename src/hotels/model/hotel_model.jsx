class HotelModel {
  constructor(destinationId, title, city, rating, overview, hotelCategory, rate, image) {
    (this.destinationId = destinationId),
    (this.title = title),
    (this.city = city),
    (this.rating = rating),
    (this.overview = overview),
    (this.hotelCategory = hotelCategory),
    (this.rate = rate),
    (this.image = image);
      
  }

  toJson() {
    return {
      destinationId: this.destinationId,
      title: this.title,
      city: this.city,
      rating: this.rating,
      overview: this.overview,
      hotelCategory: this.hotelCategory,
      rate: this.rate,
      image: this.image,
    };
  }

  static fromJson(json) {
    return new HotelModel(
      json.destinationId,
      json.title,
      json.city,
      json.rating,
      json.overview,
      json.hotelCategory,
      json.rate,
      json.image,
      json.createdAt,
      json.updatedAt
    );
  }
}
