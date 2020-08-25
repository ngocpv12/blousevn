import { Component, OnInit } from '@angular/core';
import { ExaminationService } from 'src/app/Services/examination.service';

@Component({
  selector: 'app-manage-request',
  templateUrl: './manage-request.component.html',
  styleUrls: ['./manage-request.component.css']
})
export class ManageRequestComponent implements OnInit {
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
          .filter(examination => examination.status === 0);
        console.log(this.listMedicalExamination);
      });
  }
}
