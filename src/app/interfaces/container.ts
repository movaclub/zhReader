import {Books} from './books';
import {Book} from './book';

export interface Container {
  ui: string;
  books?: Array<Books>;
  book?: Book;
}
