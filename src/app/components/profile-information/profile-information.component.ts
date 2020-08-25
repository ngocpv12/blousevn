import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/Services/patient.service';
import { IPatient } from 'src/app/entity/patient';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.css']
})
export class ProfileInformationComponent implements OnInit {
  currentPatient;
  constructor(private _patientSerivce: PatientService) { }

  ngOnInit(): void {
    this._patientSerivce.getPatientById()
      .subscribe(response => {
        this.currentPatient = response;
        
        console.log("alo alo");
        
        console.log(this.currentPatient);
      });
  }

}
