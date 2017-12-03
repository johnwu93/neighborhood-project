// @flow

export default class BusinessSearchQuery {
  name: string;
  city: string;

  constructor(name: string, city: string = 'Los Angeles, CA') {
    this.name = name;
    this.city = city;
  }
}
