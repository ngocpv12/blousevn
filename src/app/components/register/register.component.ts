import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { PatientService } from 'src/app/Services/patient.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder, 
    private _router: Router,
    private _patient: PatientService
    ) { }

  ngOnInit(): void {
  }
  get username() {
    return this.addForm.get('username');
  }
  get password() {
    return this.addForm.get('password');
  }
  get rePassword() {
    return this.addForm.get('rePassword');
  }
  get email() {
    return this.addForm.get('email');
  }
  addForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    rePassword: ['', Validators.required],
    email: ['', Validators.required]
  });

  onSubmit(){
    this._patient.register(this.addForm.value)
      .subscribe(response => {
        console.log("Register successfully");
        this._router.navigate(["/register-pending", {message: "Chúng tôi đã gửi mail xác nhận về email của quý khách."}]);
      },
      error => {
        console.log("register fail", error);
      });
  }
}
