export interface Forms {
  formId: number;
  title?: string | null;
  description?: string | null;
  departmentId?: number | null;

  department?: any | null;  
  applications?: any[];      
}
