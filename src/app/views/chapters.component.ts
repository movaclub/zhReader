import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Unsubscribable} from 'rxjs';
import {Container} from '../interfaces/container';
import {StatesService} from '../services/states.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'zh-reader-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit {

  // general
  public sContainer: Container;

  // chapter UI
  public chapterUI: { addChapterFrom: boolean; chapterLIst: boolean; };
  private svcUnsubsc: Unsubscribable;
  public myFormData: FormData;
  private postUrl = 'http://localhost:4848/api/upl';
  public myForm = new FormGroup({
    title: new FormControl('造句法'),
    bookID: new FormControl(''),
    file: new FormControl('',
      [Validators.required]),
    fileSource: new FormControl('',
      [Validators.required])
  });

  constructor(private http: HttpClient,
              private stateSvc: StatesService) {
    this.chapterUI = {addChapterFrom: false, chapterLIst: true};
  }

  get f(): { [p: string]: AbstractControl } {
    return this.myForm.controls;
  }

  onFileChange(event): void {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      this.myForm.patchValue({
        fileSource: file
      });
    }
    // console.log('onFileChange: ', this.myForm);
  }

  submit(): void {
    const formData = new FormData();
    formData.append('bookID', this.sContainer.book.yb_id.toString());
    formData.append('title', this.myForm.get('title').value);
    formData.append('file', this.myForm.get('fileSource').value);
    console.log('FORMdata: ', formData);
    this.http.post(this.postUrl, formData)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      });
  }

  ngOnInit(): void {
    this.svcUnsubsc = this.stateSvc.getContainer()
      .subscribe(datum => {
        this.sContainer = datum;
      });
  }

  showAddChapterForm(): void {
    this.chapterUI.addChapterFrom = !this.chapterUI.addChapterFrom;
    this.chapterUI.addChapterFrom ?
      this.chapterUI.chapterLIst = false :
      this.chapterUI.chapterLIst = true;
  }

}
