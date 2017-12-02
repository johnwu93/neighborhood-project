// @flow
export default class Review {
  text: string;
  url: string;

  constructor(text: string, url: string) {
    this.text = text;
    this.url = url;
  }
}
