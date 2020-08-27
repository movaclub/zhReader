import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import {Books} from '../interfaces/books';
import {Book} from '../interfaces/book';
import {Container} from '../interfaces/container';
import {map} from 'rxjs/operators';
import {Chapters} from '../interfaces/chapters';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  private baseURL = 'http://localhost:4848/api/';
  private URLs = {
    books: `${this.baseURL}book/list`,
    addTitle: `${this.baseURL}book/add`,
    updTitle: `${this.baseURL}book/upd`,
    getChaps: `${this.baseURL}book/chapters`
  };

  private sContainer: Container;
  private stateContainer = new BehaviorSubject(this.sContainer);

  constructor(private http: HttpClient) {
    this.getBooks();
  }

  getContainer(): Observable<Container> {
    return this.stateContainer.asObservable();
  }

  addNewTitle(title: string): void {
    this.http.post(this.URLs.addTitle, {title})
      .subscribe(() => this.getBooks());
  }

  updBookTitle(book: Book): void {
    this.http.post(this.URLs.updTitle, {book})
      .subscribe(() => this.getBooks());
  }

  // start UI: state+payload
  getBooks(): void {
    this.http.get<Books[]>(this.URLs.books)
      .subscribe(datum => {
        this.sContainer = {ui: null, books: null};
        this.sContainer.ui = 'books'; // redundant?
        this.sContainer.books = datum;
        this.updState(this.sContainer);
      });
  }

  updState(sContainer: Container): void {
    this.stateContainer.next(sContainer);
  }

  // one book UI
  showBookChapters(buk: Book): void {
    this.sContainer.ui = 'book'; // state
    this.sContainer.book = buk;  // book chosen
    this.getChapters(buk.yb_id); // book chaps
  }

  // get Chapter list for a book
  getChapters(bookID: number): void {
    this.http.get<Chapters>(`${this.URLs.getChaps}/${bookID}`)
      .subscribe( chaps => {
        this.sContainer.chaps = chaps.chapters;
        this.updState({...this.sContainer});
      });
  }


}
