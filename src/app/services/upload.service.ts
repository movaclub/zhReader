import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Chapter} from '../interfaces/chapter';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private postUrl = 'http://localhost:4848';

  constructor(private http: HttpClient) {
  }

  upload(formData: any): void {
    this.http.post<Chapter[]>(`${this.postUrl}/api/upl`, formData)
      .subscribe( res => console.log('upload-res: ', res));
  }

}
