import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Books} from '../interfaces/books';
import {Container} from '../interfaces/container';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  private baseURL = 'http://localhost:4848/api/';
  private URLs = {
    books: `${this.baseURL}book/list`
  };

  private sContainer: Container;
  private stateContainer = new BehaviorSubject(this.sContainer);

  constructor(private http: HttpClient) {
    this.getBooks();
  }

  getContainer(): Observable<Container>{
    return this.stateContainer.asObservable();
  }

  // start UI: state+payload
  getBooks(): void {
   this.http.get<Books[]>(this.URLs.books)
      .subscribe( datum => {
        this.sContainer = {ui: null, books: null};
        this.sContainer.ui = 'books'; // redundant?
        this.sContainer.books = datum;
        this.updState(this.sContainer);
      });
  }

  updState(sContainer: Container): void {
    this.stateContainer.next(sContainer);
  }


}
