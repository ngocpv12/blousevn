import { PaymentService } from './../../Services/payment.service';
import { Component, OnInit } from '@angular/core';
import { ExaminationService } from 'src/app/Services/examination.service';

@Component({
  selector: 'app-manage-all-schedule',
  templateUrl: './manage-all-schedule.component.html',
  styleUrls: ['./manage-all-schedule.component.css']
})
export class ManageAllScheduleComponent implements OnInit {

  constructor(
    private _examination: ExaminationService,
    private _paymentService: PaymentService,
  ) { }
  listMedicalExamination;
  momoResponse;
  popupId = "popup-";
  ngOnInit(): void {
    this.getMedicalExamination();
  }

  getMedicalExamination(){
    this._examination.getExaminationByFilter()
      .subscribe(response => {
        console.log("data medi exam:");
        this.listMedicalExamination = response;
        this.listMedicalExamination =  this.listMedicalExamination.data;
        console.log(this.listMedicalExamination);
      });
  }

  getPayment = (data) => {
    this._paymentService.getPayUrl(data)
      .subscribe(
        response => {
          this.momoResponse = response;
          document.location.href = this.momoResponse.payUrl;
        }
      );
  }

  togglePopup = (exam) => {
    document.getElementById("popup-" + exam.id).classList.toggle("active");
  }

}