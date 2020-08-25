import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  _url = environment.SERVER_URL + 'feedback';

  constructor(private _http: HttpClient) { }
  getFeedbackbyDoctorId(id: number){
    return this._http.get<any>(this._url + "/" + id)
      .pipe(catchError(this.errorHandler));
  }

  
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
}
