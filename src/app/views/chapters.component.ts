import {Component, OnInit} from '@angular/core';
import {Observable, Unsubscribable} from 'rxjs';
import {Container} from '../interfaces/container';
import {StatesService} from '../services/states.service';
import {UploadService} from '../services/upload.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Chapters} from '../interfaces/chapters';

@Component({
  selector: 'zh-reader-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit {

  // general
  public sContainer: Container; // for our reactive form
  public container: Observable<Container>; // for our UI

  // chapter UI
  public chapterUI: { addChapterFrom: boolean; chapterLIst: boolean; };
  private svcUnsubsc: Unsubscribable;
  public chapterList: Observable<Chapters>;
  // public myFormData: FormData;

  public myForm = new FormGroup({
    title: new FormControl('造句法'),
    bookID: new FormControl(''),
    file: new FormControl('',
      [Validators.required]),
    fileSource: new FormControl('',
      [Validators.required])
  });

  constructor(private uploadService: UploadService,
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
  }

  submit(): void {
    const formData = new FormData();
    formData.append('bookID', this.sContainer.book.yb_id.toString());
    formData.append('title', this.myForm.get('title').value);
    formData.append('file', this.myForm.get('fileSource').value);
    console.log('FORMdata: ', formData);
    this.chapterUI = {addChapterFrom: false, chapterLIst: true};
    this.uploadService.upload(formData);
    // this.http.post(this.postUrl, formData)
    //   .subscribe(res => {
    //     console.log(res);
    //     this.chapterUI = {addChapterFrom: false, chapterLIst: true};
    //     // alert('Uploaded Successfully.');
    //   });
  }

  ngOnInit(): void {
    this.container = this.stateSvc.getContainer();
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

  showBookList(): void {
    // this.stateSvc.getBooks();
  }

  cancelAddNewChapter(): void {
    this.chapterUI = {addChapterFrom: false, chapterLIst: true};
  }

}
