import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private doctor: DoctorService) { }
  top3Doctors;
  ngOnInit(): void {
    this.load3Doctors();
  }
  load3Doctors(){
    console.log("Load 3 doctor");
    
    this.doctor.loadThreeDoctor().subscribe(response => {
      this.top3Doctors = response;
      console.log("Data top 3");
      console.log(this.top3Doctors);
      
    });
  }
}
