import {Books} from './books';
import {Book} from './book';
import {Chapter} from './chapter';

export interface Container {
  ui: string;
  books?: Array<Books>;
  book?: Book;
  chaps?: Chapter[];
}
