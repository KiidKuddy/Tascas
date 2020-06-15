export default class Tasca {
  _id: string;
  name: string;
  address: string;
  rating: number;
  photo?: any;

  constructor({
    _id,
    name,
    address,
    rating,
    photo,
  }: {
    _id?: string;
    name: string;
    address: string;
    rating: number;
    photo?: any;
  }) {
    this._id = _id;
    this.name = name;
    this.address = address;
    this.rating = rating;
    this.photo = photo;
  }
}
