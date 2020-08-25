import { Component, OnInit } from '@angular/core';
import { IDoctor } from 'src/app/Entity/doctor';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SessionService } from 'src/app/Services/session.service';
import { DoctorService } from 'src/app/Services/doctor.service';
import { FeedbackService } from 'src/app/Services/feedback.service';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css']
})
export class DoctorDetailComponent implements OnInit {

  doctorId;
  name;
  departmentName;
  hospitalName;
  feedbackAvgScore;
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private feedback: FeedbackService
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      debugger
      let doctorId = parseInt(params.get('doctorId'));
      this.doctorId = doctorId;
      let name = params.get('name');
      this.name = name;
      let departmentName = params.get('departmentName');
      this.departmentName = departmentName;
      let hospitalName = params.get('hospitalName');
      this.hospitalName = hospitalName;
    });
 
    this.getFeedbackAvgScore();
  }
  getFeedbackAvgScore(){
    this.feedback.getFeedbackbyDoctorId(1)
      .subscribe((response)=>{
        let tempdata = response;
        this.feedbackAvgScore = tempdata.averageStar;
        console.log(tempdata);
      });
  }
  book() {
    this.router.navigate(['/schedule', { doctorId: this.doctorId, doctorName: this.name }]);
  }
  back(){
    this.router.navigate(['/doctor']);
  }
}
