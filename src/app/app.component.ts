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
  public newTitle: FormControl;
  public sContainer: Observable<Container>;

  constructor(private stateSvc: StatesService) {
    this.showForm = false;
  }

  ngOnInit(): void {
    this.sContainer = this.stateSvc.getContainer();
  }

  showAddForm(): void {
    this.showForm = !this.showForm;
  }

  addNewTitle(): void {
    console.log('addNewT: ', this.newTitle);
  }

  cancelNewTitle(): void {
    // tslint:disable-next-line:no-unused-expression
    this.newTitle.reset;
    this.showForm = false;
  }

}
