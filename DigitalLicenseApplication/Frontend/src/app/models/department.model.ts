export interface Department {
  departmentId: number;
  name: string;
  description?: string;
}

export interface DepartmentPostDTO {
  name: string;
  description?: string;
}
