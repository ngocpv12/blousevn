import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/Services/patient.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  currentPatient;
  constructor(private _patientSerivce: PatientService) { }

  ngOnInit(): void {
    this._patientSerivce.getPatientById()
      .subscribe(response => {
        this.currentPatient = response;
        console.log(this.currentPatient);
      });
  }
}
