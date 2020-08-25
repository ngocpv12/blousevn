import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDoctor } from 'src/app/entity/doctor';
import { DoctorService } from 'src/app/Services/doctor.service';
import { IUser } from 'src/app/entity/user';
import { SessionService } from 'src/app/Services/session.service';
import { HospitalService } from 'src/app/Services/hospital.service';
import { DepartmentService } from 'src/app/Services/department.service';


@Component({
  selector: 'app-doctor-page',
  templateUrl: './doctor-page.component.html',
  styleUrls: ['./doctor-page.component.css']
})
export class DoctorPageComponent implements OnInit {

  constructor(
    private _router: Router,
    private _doctorServices: DoctorService,
    private _hospitalService: HospitalService,
    private _departmentService: DepartmentService
  ) { }
  // paging
  pageIndex: number=1;
  pageChanged(event: Event){

  }
  ngOnInit(): void {
    this.loadAllDoctor();
    this.loadHospitalInfo();
  }



  hospitals;
  // declare variable array doctor
  listDoctors: any = [];
  listUsers: Array<IUser>;
  // count doctor
  totalDoctors: number;
  searchText;
  selectedHospital;
  selectedDepartment;
  notFound;
  departmentsByHosId;
  loadAllDoctor() {
    console.log("Load doctor");
    this._doctorServices.getAllDoctors()
      .subscribe(response => {
        this.listDoctors = response;
        this.listDoctors = this.listDoctors.data;
        console.log(this.listDoctors);
        this.totalDoctors = response.length;
      })
  }
  // onSelect(id){
  //   this.router.navigate(['/doctor', id]);
  // }

  // function on select each card
  onSelect(doctor: IDoctor){

    this._router.navigate(['/doctor', doctor.id,{
      doctorId: doctor.id,
      name: doctor.user.fullName,
      departmentName: doctor.department.name,
      hospitalName: doctor.department.hospital.name
    }]);
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
        this.notFound = '';
        this.totalDoctors = response.length;
        this.selectedDepartment = '';
      },
        error => {
          console.log("error -------------", error);
          this.notFound = "Rất tiếc! Chúng tôi không tìm thấy bác sĩ mà bạn muốn";
          this.listDoctors = [];
          console.log("list doctor");
          console.log( this.listDoctors);
          this.selectedDepartment = '';
        }
      );
      
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

}
