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
        console.log("login successful" + response);
        window.location.href = "http://localhost:4202/home";
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
        console.log("Login successfully");
        this.loginFailMessage = '';
        this.changeStatus();
        window.location.href = "http://localhost:4202/home";
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
