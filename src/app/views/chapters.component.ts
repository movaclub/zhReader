import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest, HttpResponse} from '@angular/common/http';
import {Subscription, Unsubscribable} from 'rxjs';
import {Container} from '../interfaces/container';
import {StatesService} from '../services/states.service';

@Component({
  selector: 'zh-reader-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit, OnDestroy {

  // general
  public sContainer: Container;

  // chapter UI
  public chapterUI: { addChapterFrom: boolean; chapterLIst: boolean; };
  private svcUnsubsc: Unsubscribable;
  public myFormData: FormData;
  private postUrl = 'http://localhost:4848/api/upl';
  public httpEvent: HttpEvent<{}>;
  public file: File;
  public uploadPercent = 0;

  constructor(private httpClient: HttpClient,
              private stateSvc: StatesService) {
    this.chapterUI = {addChapterFrom: false, chapterLIst: true};
  }

  ngOnDestroy(): void {
    this.svcUnsubsc.unsubscribe();
  }

  ngOnInit(): void {
    this.svcUnsubsc = this.stateSvc.getContainer()
      .subscribe(datum => this.sContainer = datum);
  }

  showAddChapterForm(): void {
    this.chapterUI.addChapterFrom = !this.chapterUI.addChapterFrom;
    this.chapterUI.addChapterFrom ? this.chapterUI.chapterLIst = false : this.chapterUI.chapterLIst = true;
  }

  uploadFiles(file: File): Subscription {
    console.log('myFormData: ', this.myFormData);
    const config = new HttpRequest('POST', this.postUrl, this.myFormData, {
      reportProgress: true
    });

    return this.httpClient.request(config)
      .subscribe(event => {
          this.httpEvent = event;

          if (event instanceof HttpResponse) {
            alert('upload complete, old school alert used');
          }
        },
        error => {
          alert('!failure beyond compare cause:' + error.toString());
        });
  }
}
