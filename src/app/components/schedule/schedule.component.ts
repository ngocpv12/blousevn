import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { DoctorService } from 'src/app/Services/doctor.service';
import { HospitalService } from 'src/app/Services/hospital.service';
import { DepartmentService } from 'src/app/Services/department.service';
import { ExaminationService } from 'src/app/Services/examination.service';

declare const nextPrev: any;


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  // selected id doctor
  selectedIdDoctor;
  // check if doctor is not chose
  doctorRequired;
  dateRequired;
  errorMessage: string;
  hospitals;
  selectedDoctor;
  // declare variable array doctor
  listDoctors: any = [];
  datePicker;
  // count doctor
  totalDoctors: number;
  searchText;
  selectedHospital;
  selectedDepartment;
  notFound;
  departmentsByHosId;
  toggleForm: boolean = false;

  // message to notice request success
  noticeRequestMessage: string;
  constructor(
    private fb: FormBuilder,
    private _doctorServices: DoctorService,
    private _hospitalService: HospitalService,
    private _departmentService: DepartmentService,
    private _examination: ExaminationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadHospitalInfo();
    this.route.paramMap.subscribe((params: ParamMap) => {
      let doctorId = parseInt(params.get('doctorId'));
      this.selectedIdDoctor = doctorId;
      let name = params.get('doctorName');
      this.selectedDoctor = name;
    });
    console.log("selected name doctor " + this.selectedDoctor);
    console.log("selected id doctor " + this.selectedIdDoctor);
  }


  onSubmit() {
    console.log("I am doing submit!");

  }

  // function search doctor
  searchDoctor(hospitalId: number = null, departmentId: number = null, txtSearch: string) {
    console.log("Executing search doctor");
    console.log("hospitalId:" + hospitalId + "departmentId:" + departmentId + "txtSearch:" + txtSearch);
    // CONTINUE HERE
    this._doctorServices.getDoctorByFilter(hospitalId, departmentId, txtSearch)
      .subscribe(response => {
        this.listDoctors = response;
        this.listDoctors = this.listDoctors.data;
        console.log("data after searching:");
        console.log(this.listDoctors);
        this.totalDoctors = response.length;
        this.selectedDepartment = '';
      },
        error => {
          console.log("error -------------");
          this.notFound = "Rất tiếc! Chúng tôi không tìm thấy bác sĩ mà bạn muốn";
          this.listDoctors = [];
          this.selectedDepartment = '';
        }

      );
      
    this.doctorRequired = "";
    this.dateRequired = "";
  }
  clearInput = () => {
    this.searchText = '';
    this.selectedHospital = '';
    
  }
  // load all hospital
  loadHospitalInfo() {
    console.log("I am loading hospitalInfo");
    this._hospitalService.getAllHospital()
      .subscribe(response => {
        this.hospitals = response;
        console.log(this.hospitals);
      });
  }
  // load all department by id
  loadDepartmentByHosId(id) {
    console.log("Loading department with hospital id:" + id);
    this._departmentService.getDepartmentByHosId(id)
      .subscribe((response) => {
        this.departmentsByHosId = response;
        console.log("List department by id" + id + "----------------");
        console.log(this.departmentsByHosId);
      });
  }

  togglePopup() {
    document.getElementById("popup-1").classList.toggle("active");
    this.doctorRequired = "";
    this.dateRequired = "";
  }
  togglePopup2() {
    document.getElementById("popup-2").classList.toggle("active");
    this.doctorRequired = "";
    this.dateRequired = "";
  }
  displayError() {
    console.log("I am displaying error!");
    this.notFound = "";
    if (!this.selectedIdDoctor && !this.datePicker) {
      this.doctorRequired = "Bạn phải đặt lịch với một bác sĩ!";
      this.dateRequired = "Bạn phải chọn một ngày để khám!";
    } else if (!this.selectedIdDoctor) {
      this.doctorRequired = "Bạn phải đặt lịch với một bác sĩ!";
    } else if (!this.datePicker) {
      this.dateRequired = "Bạn phải chọn một ngày để khám!";
    }
    console.log(this.selectedDoctor);
    console.log(this.datePicker);
  }

  sendRequest(doctorId, date) {
    this._examination.requestExamination(doctorId, date)
      .subscribe(response => {
        console.log("Gui yeu cau thanh cong", response);
        this.noticeRequestMessage = "Bạn đã gửi yêu cầu khám thành công!";
      },
        err => {
          console.log(err);
        });
    this.togglePopup2();
  }
}
