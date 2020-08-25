import { Injectable } from '@angular/core';
import { IDoctor } from '../entity/doctor';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  doctor: IDoctor = null;
  constructor() { }
  getDoctorSession(): IDoctor{
    return this.doctor;
  }
  saveDoctorSession(doctor: IDoctor){
    this.doctor = doctor;
  }
  deleteDoctorSession(){
    this.doctor = null;
  }
}
