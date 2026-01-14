using DigitalLicenseApplication.Interface.Repository;
using DigitalLicenseApplication.Models;
using System.Collections.Generic;
using System.Linq;

namespace DigitalLicenseApplication.Repository
{
    public class DepartmentRepository : IDepartmentrepo
    {
        private readonly AppDbContext _context;

        public DepartmentRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Department> GetAllDepartments()
        {
            return _context.Departments.ToList();
        }

        public Department GetDepartmentById(int id)
        {
            return _context.Departments.FirstOrDefault(d => d.DepartmentId == id);
        }

        public void AddDepartment(Department department)
        {
            _context.Departments.Add(department);
            _context.SaveChanges();
        }

        public void UpdateDepartment(Department department)
        {
            var existing = _context.Departments.FirstOrDefault(d => d.DepartmentId == department.DepartmentId);
            if (existing == null)
                throw new KeyNotFoundException("Department not found");

            existing.Name = department.Name;
            existing.Description = department.Description;

            _context.SaveChanges();
        }

        public void DeleteDepartment(int id)
        {
            var department = _context.Departments.FirstOrDefault(d => d.DepartmentId == id);
            if (department == null)
                throw new KeyNotFoundException("Department not found");

            if ((department.Officers != null && department.Officers.Any()) ||
                (department.Forms != null && department.Forms.Any()) ||
                (department.Applications != null && department.Applications.Any()))
            {
                throw new InvalidOperationException(
                    "Cannot delete department. Users, forms, or applications exist in this department.");
            }

            _context.Departments.Remove(department);
            _context.SaveChanges();
        }
    }
}
