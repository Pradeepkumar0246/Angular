import { Hospital } from "./Hospital.model";
import { Patient } from "./Patient.model";

export interface Doctor{
    doctorId:string;
    name:string;
    specialization:string;
    hospitalId:string;
    hospital?: Hospital | null;
    Patients?:Patient[] | null;
}