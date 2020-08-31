import { Component, OnInit } from '@angular/core';
import { IDoctor } from 'src/app/entity/doctor';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SessionService } from 'src/app/Services/session.service';
import { DoctorService } from 'src/app/Services/doctor.service';
import { FeedbackService } from 'src/app/Services/feedback.service';
import { ExaminationService } from 'src/app/Services/examination.service';

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
  selectedDoctor;
  selectedIdDoctor;
  datePicker;
  dateRequired;
    // message to notice request success
    noticeRequestSuccess: boolean = false;
    noticeRequestFail: boolean = false;
    noticeRequestExisted: boolean = true;
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private feedback: FeedbackService,
    private _examination: ExaminationService
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
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
  toggle(){
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
  
    var popup = document.getElementById('popup');
    popup.classList.toggle('active');
  }
  toggle2(){

    var popup2 = document.getElementById('popup2');
    popup2.classList.toggle('active');
  }
  sendRequest(doctorId, date) {
    this._examination.requestExamination(doctorId, date)
      .subscribe(response => {
        console.log("Gui yeu cau thanh cong", response);
        this.noticeRequestSuccess = true;
        this.noticeRequestFail = false;
        this.noticeRequestExisted= false;
      },
        err => {
          console.log(err);
          let tempMessage = err.message;
          if(tempMessage){
            this.noticeRequestExisted= true;
          }else{
            this.noticeRequestExisted= false;
            this.noticeRequestSuccess = false;
            this.noticeRequestFail = true;
          }
        });
    this.toggle();
    this.toggle2();
  }
  displayError() {
    if (!this.datePicker) {
      this.dateRequired = "Bạn phải chọn một ngày để khám!";
    }
    console.log(this.datePicker);
  }
}
