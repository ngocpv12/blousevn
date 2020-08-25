import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import decode from 'jwt-decode';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IMedicalExamination } from '../entity/medical-examination';
import { IPayment } from '../entity/payment';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {

  constructor(
    private _http: HttpClient,
    private _cookieService: CookieService
  ) { }
  
  _url = environment.SERVER_URL + 'medical-examination';
  token = this._cookieService.get('access_token');
  tokenPayload = decode(this.token);
  patientId = this.tokenPayload.id;

  requestExamination(doctorId, date){
    return this._http.post<any>(this._url, {doctorId: doctorId, appointmentTime: date})
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {

    return Observable.throw(error.message || "Server Error");
  }

  getAllRequestExamination(){
    return this._http.get<IMedicalExamination[]>(this._url)
    .pipe(catchError(this.errorHandler));
  }
  
  //p = patientId
  getExaminationByFilter(): Observable<IMedicalExamination[]> {
    let searchUrl = this._url + '?p=' + this.patientId;    

    return this._http.get<IMedicalExamination[]>(searchUrl)
      .pipe(catchError(this.errorHandler));
  }
}
