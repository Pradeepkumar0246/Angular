import { Doctor } from "./Doctor.model";
import { Patient } from "./Patient.model";

export interface Hospital{
    hospitalId: string;
name?: string | null;
doctors?: Doctor[] | null;
patients?: Patient[] | null;
}