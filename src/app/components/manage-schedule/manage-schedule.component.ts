import { Component, OnInit } from '@angular/core';
import { ExaminationService } from 'src/app/Services/examination.service';

@Component({
  selector: 'app-manage-schedule',
  templateUrl: './manage-schedule.component.html',
  styleUrls: ['./manage-schedule.component.css']
})
export class ManageScheduleComponent implements OnInit {

  constructor(
    private _examination: ExaminationService
  ) { }  
  listMedicalExamination;

  ngOnInit(): void {
    this.getMedicalExamination();
  }

  getMedicalExamination(){
    this._examination.getExaminationByFilter()
      .subscribe(response => {
        console.log("data medi exam:");
        this.listMedicalExamination = response;
        this.listMedicalExamination =  this.listMedicalExamination.data;
        this.listMedicalExamination = this.listMedicalExamination
        .filter(examination => (
          examination.status === 2 || examination.status === 3
        ) && new Date(examination.appointment.appointmentTime) > new Date());
        console.log(this.listMedicalExamination);
      });
  }

}
