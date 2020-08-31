import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _url = environment.SERVER_URL + 'user';
  constructor(private _http: HttpClient) { }
  uploadImage(fileImage){
    return this._http.post<any>(this._url + "/upload-avatar", fileImage)
      .pipe(catchError(this.errorHandler));
  }
  
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
}
