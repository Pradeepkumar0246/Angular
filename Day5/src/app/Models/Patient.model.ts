import { Doctor } from "./Doctor.model";
import { Hospital } from "./Hospital.model";

export interface Patient{
    patientId: string;
name?: string | null;
hospitalId: string;
hospital?: Hospital | null;
doctors?: Doctor[] | null;
}