import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExaminationService } from 'src/app/Services/examination.service';

@Component({
  selector: 'app-manage-index',
  templateUrl: './manage-index.component.html',
  styleUrls: ['./manage-index.component.css']
})
export class ManageIndexComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _examination: ExaminationService
  ) { }

  currentUrl;
  currentIndex;
  listMedicalExamination;
  // lstRequestExamination;
  // lstWfpExamination;
  // lstScheduleExamination;
  // lstHistoryExamination;
  // lstCancelExamination;

  ngOnInit(): void {
    console.log("What is this router");
    console.log(this.router.url);
    this.currentUrl = this.router.url;
    if (this.currentUrl == '/manage-index/manage-all') {
      this.currentIndex = 'manage-all';
    } else if (this.currentUrl == '/manage-index/manage-request') {
      this.currentIndex = 'manage-request';
    } else if (this.currentUrl == '/manage-index/manage-confirmed') {
      this.currentIndex = 'manage-confirmed';
    } else if (this.currentUrl == '/manage-index/manage-schedule') {
      this.currentIndex = 'manage-schedule';
    } else if (this.currentUrl == '/manage-index/manage-history') {
      this.currentIndex = 'manage-history';
    } else if (this.currentUrl == '/manage-index/manage-cancel') {
      this.currentIndex = 'manage-cancel';
    }
  }

  showAll() {
    this.router.navigate(['manage-all'], { relativeTo: this.route });
    this.currentIndex = "manage-all";
  }
  showRequest() {
    this.router.navigate(['manage-request'], { relativeTo: this.route });
    this.currentIndex = "manage-request";
  }
  showConfirmed() {
    this.router.navigate(['manage-confirmed'], { relativeTo: this.route });
    this.currentIndex = "manage-confirmed";
  }
  showSchedule() {
    this.router.navigate(['manage-schedule'], { relativeTo: this.route });
    this.currentIndex = "manage-schedule";
  }
  showHistory() {
    this.router.navigate(['manage-history'], { relativeTo: this.route });
    this.currentIndex = "manage-history";
  }
  showCanceled() {
    this.router.navigate(['manage-cancel'], { relativeTo: this.route });
    this.currentIndex = "manage-cancel";
  }
  
  // getAllMedicalExamination(){
  //   this._examination.getExaminationByFilter()
  //     .subscribe(response => {
  //       console.log("data medi exam:");
  //       this.listMedicalExamination = response;
  //       this.listMedicalExamination =  this.listMedicalExamination.data;
  //       console.log(this.listMedicalExamination);

  //       this.lstRequestExamination = this.listMedicalExamination
  //         .filter(examination => examination.status === 0);
        
  //       this.lstWfpExamination = this.listMedicalExamination
  //         .filter(examination => examination.status === 1);

  //       this.lstScheduleExamination = this.listMedicalExamination
  //       .filter(examination => (
  //         examination.status === 2 || examination.status === 3
  //       ) && new Date(examination.appointment.appointmentTime) <= new Date());

  //       this.lstHistoryExamination = this.listMedicalExamination
  //       .filter(examination => (
  //         examination.status === 2 || examination.status === 3
  //       ) && new Date(examination.appointment.appointmentTime) > new Date());

  //       this.lstCancelExamination = this.listMedicalExamination
  //       .filter(examination => examination.status === 4);
  //     });
  // }
}
