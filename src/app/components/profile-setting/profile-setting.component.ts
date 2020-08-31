import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.css']
})
export class ProfileSettingComponent implements OnInit {
  selectedFile;
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private userService: UserService
    ) { }

  ngOnInit(): void {
  }
  showProfileInfo(){
    this.router.navigate(['profile-info'], {relativeTo: this.route});
  }
  showAccountInfo(){
    this.router.navigate(['account-info'], {relativeTo: this.route});

  }
  uploadImage(fileImage){
    console.log("uploading image");
    this.userService.uploadImage(fileImage)
      .subscribe(response => {
        console.log(response);
      
      });
  }
}
