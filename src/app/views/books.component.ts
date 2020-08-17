import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Container} from '../interfaces/container';
import {FormControl, Validators} from '@angular/forms';
import {StatesService} from '../services/states.service';
import {Book} from '../interfaces/book';

@Component({
  selector: 'zh-reader-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {


  // general
  public sContainer: Observable<Container>;
  private container: Container;

  // book UI
  public bookUI: {addTitleForm: boolean; editTitleForm: boolean};
  public subMenu: number;
  public newTitle: FormControl;
  public curTitle: FormControl;
  private curBookTitle: Book;

  constructor(private stateSvc: StatesService) {
    this.bookUI = {
      addTitleForm: false,
      editTitleForm: false};
    this.subMenu = 0;
    this.newTitle = new FormControl('', Validators.required);
    this.curTitle = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
    this.sContainer = this.stateSvc.getContainer();
  }

  showAddForm(): void {
    this.bookUI.addTitleForm = !this.bookUI.addTitleForm;
  }

  addNewTitle(): void { // 中國現代語法 道德徑
    // tslint:disable-next-line:no-unused-expression
    this.bookUI.addTitleForm = false;
    this.stateSvc.addNewTitle(this.newTitle.value);
    this.newTitle.reset('');
  }

  cancelNewTitle(): void {
    // tslint:disable-next-line:no-unused-expression
    this.newTitle.reset('');
    this.bookUI.addTitleForm = false;
  }

  rightClickMenu(id: number): boolean {
    this.subMenu = id;
    return false;
  }

  editBookTitle(buk: Book): void {
    console.log('editBookTitle-buk: ', buk);
    this.bookUI.editTitleForm = true;
    this.curTitle.patchValue(buk.yb_title);
    this.curBookTitle = buk;
  }

  updateTitle(): void {
    this.curBookTitle.yb_title = this.curTitle.value;
    console.log('updateTitle-', this.curBookTitle);
    this.stateSvc.updBookTitle(this.curBookTitle);
    this.curTitle.reset('');
    this.bookUI.editTitleForm = false;
    this.subMenu = 0;
  }

  cancelEditTitle(): void {
    this.curTitle.reset('');
    this.bookUI.editTitleForm = false;
  }

  showBook(buk: Book): void {
    console.log('BUK: ', buk);
    this.stateSvc.showBookChapters(buk);
  }

}
