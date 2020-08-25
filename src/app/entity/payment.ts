import { IPatient } from './patient';
import { IMedicalExamination } from './medical-examination';

export interface IPayment{
    id: number,
    patient: IPatient,
    amount: number,
    status: number,
    isActive: number,
    createdAt: Date,
    modifiedAt: Date,
    medicalExamination: IMedicalExamination
}