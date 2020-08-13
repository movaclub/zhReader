import {Component, OnInit} from '@angular/core';
import {Container} from './interfaces/container';
import {StatesService} from './services/states.service';
import {Observable} from 'rxjs';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'zh-reader-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // general
  public sContainer: Observable<Container>;

  // book UI
  public bookUI = { addTitleForm: false};
  public subMenu: number;
  public newTitle: FormControl;

  constructor(private stateSvc: StatesService) {
    this.bookUI.addTitleForm = false;
    this.subMenu = 0;
    this.newTitle = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
    this.sContainer = this.stateSvc.getContainer();
  }

  showAddForm(): void {
    this.bookUI.addTitleForm = !this.bookUI.addTitleForm;
  }

  addNewTitle(): void { // 中國現代語法 道德徑
    // console.log('addNewT: ', this.newTitle.value);
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
    console.log('ID: ', id);
    this.subMenu = id;
    return false;
  }

}
