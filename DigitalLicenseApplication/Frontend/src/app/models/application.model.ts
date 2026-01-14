export interface Application {
  applicationId: number;
  userId: number;
  formId: number;
  departmentId: number;
  details?: string | null;

  // New fields
  fullName: string;
  fatherName: string;
  governmentIdType: string; // e.g., Aadhar, Passport
  governmentIdProof: string;
  maritalStatus: string; // e.g., Single, Married
  gender: string; // e.g., Male, Female, Other
  physicallyDisabled: boolean;
  physicallyDisabledProofPath?: string | null; 
  permanentAddress: string;

  status: string;
  rejectionReason?: string | null;
  officerId?: number | null;
  submittedDate: string;

  user?: any | null;
  form?: any | null;
  department?: any | null;
  officer?: any | null;
  documents?: any[]; // will hold uploaded files
}
