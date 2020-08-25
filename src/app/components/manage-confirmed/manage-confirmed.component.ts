import { Component, OnInit } from '@angular/core';
import { ExaminationService } from 'src/app/Services/examination.service';

@Component({
  selector: 'app-manage-confirmed',
  templateUrl: './manage-confirmed.component.html',
  styleUrls: ['./manage-confirmed.component.css']
})
export class ManageConfirmedComponent implements OnInit {

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
          .filter(examination => examination.status === 1);
        console.log(this.listMedicalExamination);
      });
  }
}