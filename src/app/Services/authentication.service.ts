import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private _http: HttpClient,private _cookieService: CookieService) { }
  _url = environment.SERVER_URL + 'auth/';
  login(userData) {
    return this._http.post<any>(this._url + 'login', userData)
      .pipe(catchError(this.errorHandler));
      
  }
  loginWithGoogle(name, email){

    return this._http.post<any>(this._url + 'oauth/google', {name: name, email: email})
    .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    
    return Observable.throw(error.message || "Server Error");
  }
  loggedIn(){
    
    return this._cookieService.check('access_token');
  }
  logout(){
    this._cookieService.delete('access_token');
  }
  getToken(){
    return this._cookieService.get('access_token');
  }

}
