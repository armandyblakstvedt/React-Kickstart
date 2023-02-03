export interface Book {
  ISBN: number;
  title: string;
  img_url: string;
  rating: number;
  genre: string;
  published: string;
  label: string;
}
export interface FirestoreBook {
  title: string;
  img_url: string;
  rating: number;
  genre: string;
  published: string;
  label: string;
}
export interface Author {
  id: string;
  name: string;
}
export interface User {
  id: string;
  name: string;
  favorites: Array<number>;
  readingList: Array<Array<number>>;
}
