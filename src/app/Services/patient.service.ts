import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IPatient } from '../entity/patient';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private _http: HttpClient, private _cookieService: CookieService) { }
  _url = environment.SERVER_URL + 'patient/';


  getPatientById() {
    let token = this._cookieService.get('access_token');
    let tokenPayload = decode(token);
    let id = tokenPayload.id;
    console.log("Token Payload:");
    console.log(tokenPayload);
    return this._http.get<IPatient[]>(this._url+"patient-by-userId/"+ id)
      .pipe(catchError(this.errorHandler));
  }
  
  register(userData) {
    return this._http.post<any>(this._url + "register", userData)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {

    return Observable.throw(error.message || "Server Error");
  }
}
