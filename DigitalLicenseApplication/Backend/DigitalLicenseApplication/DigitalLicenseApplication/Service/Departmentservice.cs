using DigitalLicenseApplication.Interface.Repository;
using DigitalLicenseApplication.Interface.Service;
using DigitalLicenseApplication.Models;
using System.Collections.Generic;

namespace DigitalLicenseApplication.Service
{
    public class Departmentservice : IDepartmentservice
    {
        private readonly IDepartmentrepo _departmentrepo;

        public Departmentservice(IDepartmentrepo departmentrepo)
        {
            _departmentrepo = departmentrepo;
        }

        public IEnumerable<Department> GetAllDepartments()
        {
            return _departmentrepo.GetAllDepartments();
        }

        public Department GetDepartmentById(int id)
        {
            return _departmentrepo.GetDepartmentById(id);
        }

        public void AddDepartment(Department department)
        {
            _departmentrepo.AddDepartment(department);
        }

        public void UpdateDepartment(Department department)
        {
            _departmentrepo.UpdateDepartment(department);
        }

        public void DeleteDepartment(int id)
        {
            _departmentrepo.DeleteDepartment(id);
        }
    }
}
