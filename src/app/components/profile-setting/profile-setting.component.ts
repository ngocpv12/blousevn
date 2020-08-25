import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.css']
})
export class ProfileSettingComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }
  showProfileInfo(){
    this.router.navigate(['profile-info'], {relativeTo: this.route});
  }
  showAccountInfo(){
    this.router.navigate(['account-info'], {relativeTo: this.route});

  }
}
