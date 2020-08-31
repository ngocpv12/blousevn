import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IDoctor } from '../entity/doctor';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  constructor(private _http: HttpClient) { }
  // _url = '../assets/fixedData/record.json';
  //_url = 'http://localhost:3001/entity';
  _url = environment.SERVER_URL + 'doctor';

  getAllDoctors(): Observable<IDoctor[]> {
    return this._http.get<IDoctor[]>(this._url)
      .pipe(catchError(this.errorHandler));
  }

  getDoctorById(id: number): Observable<IDoctor[]> {
    return this._http.get<IDoctor[]>(this._url + '/' + id)
      .pipe(catchError(this.errorHandler));
  }

  addDoctor(userData) {
    return this._http.post<any>(this._url, userData)
      .pipe(catchError(this.errorHandler));
  }

  deleteDoctor(id: number) {
    return this._http.delete<any>(this._url + '/' + id);
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }

  updateDoctor(id, userData) {
    return this._http.put<any>(this._url + '/' + id, userData);
  }

  // Get doc tor by hospital department or doctor name
  getDoctorByFilter(hospitalId: number, departmentId: number, txtSearch: string): Observable<IDoctor[]> {
    let searchUrl = this._url + '/search?';
    if (hospitalId != null) {
      searchUrl = searchUrl + 'hospitalId=' + hospitalId + '&';
    }
    if (departmentId != null) {
      searchUrl = searchUrl + 'departmentId=' + departmentId + '&';
    }
    if (txtSearch != null) {
      searchUrl = searchUrl + 'txtSearch=' + txtSearch + '&';
    }

    return this._http.get<IDoctor[]>(searchUrl)
      .pipe(catchError(this.errorHandler));
  }

  loadThreeDoctor(){
    return this._http.get<IDoctor[]>(this._url + "/top-three")
    .pipe(catchError(this.errorHandler));
  }
}
