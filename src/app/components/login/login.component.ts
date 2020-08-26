import { environment } from 'src/environments/environment';
import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFailMessage;
  user: SocialUser;
  loggedIn: boolean;
  @Output() public loginStatus = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _authenService: AuthenticationService,
    private _cookieService: CookieService,
    private authService: SocialAuthService
  ) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this._authenService.loginWithGoogle(user.name, user.email).subscribe((response)=> {
        const token = response.headers.get('access_token');
        this._cookieService.set('access_token', token, 60 * 60 * 1000);
        // console.log("login successful" + this._cookieService.get('access_token'));
        window.location.href = "home";
      });
    });
  }
  get username() {
    return this.addForm.get('username');
  }
  get password() {
    return this.addForm.get('password');
  }
  addForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit() {
    this._authenService.login(this.addForm.value)
      .subscribe(response => {
        console.log('response', response);
        
        const token = response.headers.get('access_token');
        this._cookieService.set('access_token', token, 60 * 60 * 1000);
        // console.log("Login successfully", this._cookieService.get('access_token'));
        this.loginFailMessage = '';
        this.changeStatus();
        window.location.href = "home";
      },
        error => {
          this.changeStatus();
          console.log("login fail");
          this.loginFailMessage = 'Tài khoản hoặc mật khẩu không chính xác';
        });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }


  changeStatus(){
    if(this.checkLoggedIn()){
      this.loginStatus.emit('true');
    }else{
      this.loginStatus.emit('false');
    }
  }
  checkLoggedIn(){
    return this._cookieService.check('access_token');
  }
}
