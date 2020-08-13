import {Component, OnInit} from '@angular/core';
import {Container} from './interfaces/container';
import {StatesService} from './services/states.service';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'zh-reader-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public showForm: boolean;
  public subMenu:number;
  public newTitle: FormControl;
  public sContainer: Observable<Container>;

  constructor(private stateSvc: StatesService) {
    this.showForm = false;
    this.subMenu = 0;
  }

  ngOnInit(): void {
    this.sContainer = this.stateSvc.getContainer();
  }

  showAddForm(): void {
    this.showForm = !this.showForm;
  }

  addNewTitle(): void { // 道德徑
    console.log('addNewT: ', this.newTitle);
    // tslint:disable-next-line:no-unused-expression
    this.newTitle.reset;
    this.showForm = false;
    this.stateSvc.addNewTitle(this.newTitle.toString());
  }

  cancelNewTitle(): void {
    // tslint:disable-next-line:no-unused-expression
    this.newTitle.reset;
    this.showForm = false;
  }

  rightClickMenu(id: number): boolean {
    console.log('ID: ', id);
    this.subMenu = id;
    return false;
  }

}
