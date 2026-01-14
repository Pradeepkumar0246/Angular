using DigitalLicenseApplication.Interface.Repository;
using DigitalLicenseApplication.Models;
using Microsoft.EntityFrameworkCore;

namespace DigitalLicenseApplication.Repository
{
    public class FormRepository :IFormrepo
    {
        private readonly AppDbContext _context;
        public FormRepository(AppDbContext context)
        {
            _context = context;
        }
        public IEnumerable<Form> GetAllForms()
        {
            return _context.Forms.Include(f => f.Department).Include(f => f.Applications).ToList();
        }
        public Form GetFormById(int id)
        {
            return _context.Forms.Include(f => f.Department).Include(f => f.Applications).FirstOrDefault(f => f.FormId == id);
        }
        public IEnumerable<Form> GetFormsByUserId(int userId)
        {
            return _context.Forms.Include(f => f.Department).Include(f => f.Applications).Where(f => f.Applications.Any(a => a.UserId == userId)).ToList();
        }
        public IEnumerable<Form> GetFormsByStatus(string status)
        {
            return _context.Forms.Include(f => f.Department).Include(f => f.Applications).Where(f => f.Applications.Any(a=>a.Status == status)).ToList();
        }
        public void SubmitForm(Form form)
        {
            _context.Forms.Add(form);
            _context.SaveChanges();
        }
        public void UpdateForm(Form form)
        {
            var existingForm = _context.Forms.Find(form.FormId);
            if (existingForm != null)
            {
                existingForm.Title = form.Title;
                existingForm.Description = form.Description;
                existingForm.DepartmentId = form.DepartmentId;
                _context.SaveChanges();
            }
        }

        public void DeleteForm(int id)
        {
            var form = _context.Forms.Find(id);
            if (form != null)
            {
                _context.Forms.Remove(form);
                _context.SaveChanges();
            }
        }
        public IEnumerable<Form> GetFormsByDepartment(int departmentId)
        {
            return _context.Forms.Include(f => f.Department).Include(f => f.Applications).Where(f => f.DepartmentId == departmentId).ToList();
        }
    }
}
