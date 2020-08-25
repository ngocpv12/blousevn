import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IHospital } from '../entity/hospital';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private _http: HttpClient) { }
  _url = environment.SERVER_URL + 'hospital';

  getAllHospital(): Observable<IHospital[]> {
    return this._http.get<IHospital[]>(this._url + "/name")
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
}
