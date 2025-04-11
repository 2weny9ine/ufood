export class RestaurantModel {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.address = data.address
    this.tel = data.tel
    this.location = data.location
    this.opening_hours = data.opening_hours
    this.pictures = data.pictures
    this.genres = data.genres
    this.price_range = data.price_range
    this.rating = data.rating
  }
}
