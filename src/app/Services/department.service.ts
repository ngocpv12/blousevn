import { Injectable } from '@angular/core';
import { IDepartment } from '../entity/department';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  
  constructor(private _http: HttpClient) {}
  _url = environment.SERVER_URL + 'department';

   // get list all department
  getListDepartment():Observable<IDepartment[]>{
    return this._http.get<IDepartment[]>(this._url)
                    .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }
  getDepartmentByHosId(id: number): Observable<IDepartment[]>{
    return this._http.get<IDepartment[]>(this._url+"/department-name-by-hospital" + '/' + id)
    .pipe(catchError(this.errorHandler));
  }
  
}
