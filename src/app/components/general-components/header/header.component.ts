import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _auth: AuthenticationService, 
    private _router: Router, 
    private _cookieService: CookieService,
    private authService: SocialAuthService
    ) { }
  loginStatus:boolean = false;
  ngOnInit(): void {
    console.log("login status");
    if(this.checkLoggedIn()){
      this.loginStatus = true;
    }else{
      this.loginStatus = false;
    }
    console.log(this.loginStatus);
    
  }
  checkLoggedIn(){
    return this._cookieService.check('access_token');
  }
  logout(){
    this._auth.logout();
    this.loginStatus = false;
    this.signOut();
    console.log("log out successfully!");
    this._router.navigate(['/login']);
  }
  changeStatus(value){
    this.loginStatus = value;
  }

  signOut(): void {
    this.authService.signOut();
  }
}
