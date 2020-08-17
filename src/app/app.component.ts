import {Component, OnInit} from '@angular/core';
import {Container} from './interfaces/container';
import {StatesService} from './services/states.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'zh-reader-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // general
  public sContainer: Observable<Container>;

  constructor(private stateSvc: StatesService) {
  }

  ngOnInit(): void {
    this.sContainer = this.stateSvc.getContainer();
  }

}
