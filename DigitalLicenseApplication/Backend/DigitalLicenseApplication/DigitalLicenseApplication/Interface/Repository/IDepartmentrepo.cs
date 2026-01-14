using DigitalLicenseApplication.Models;
using System.Collections.Generic;

namespace DigitalLicenseApplication.Interface.Repository
{
    public interface IDepartmentrepo
    {
        IEnumerable<Department> GetAllDepartments();
        Department GetDepartmentById(int id);
        void AddDepartment(Department department);
        void UpdateDepartment(Department department);

        void DeleteDepartment(int id);
    }
}
