using DigitalLicenseApplication.Interface.Repository;
using DigitalLicenseApplication.Models;
using Microsoft.EntityFrameworkCore;

namespace DigitalLicenseApplication.Repository
{
    public class ApplicationRepository:IApplicationrepo
    {
        private readonly AppDbContext _context;
        public ApplicationRepository(AppDbContext context)
        {
            _context = context;
        }
        public IEnumerable<Application> GetAllApplications()
        {
            return _context.Applications.Include(a => a.User).Include(a => a.Department).Include(a => a.Officer).ToList();
        }
        public Application GetApplicationById(int applicationId)
        {
            return _context.Applications.Include(a => a.Department).Include(a => a.Officer).FirstOrDefault(a => a.ApplicationId == applicationId);
        }
        public IEnumerable<Application> GetApplicationsByUserId(int userId)
        {
            return _context.Applications.Include(a=>a.Form).Include(a => a.Form) 
                .Where(a => a.UserId == userId).ToList();
        }
        public IEnumerable<Application> GetApplicationsByDepartment(int departmentId)
        {
            return _context.Applications.Where(a => a.DepartmentId == departmentId).ToList();
        }
        public IEnumerable<Application> GetApplicationsByStatus(string status)
        {
            return _context.Applications.Where(a => a.Status == status).ToList();
        }
        public void SubmitApplication(Application application)
        {
            _context.Applications.Add(application);
            _context.SaveChanges();
        }
        public void UpdateApplication(Application application)
        {
            _context.Applications.Update(application);
            _context.SaveChanges();
        }
        public void DeleteApplication(int id)
        {
            var application = _context.Applications.FirstOrDefault(a => a.ApplicationId == id);
            if (application != null)
            {
                _context.Applications.Remove(application);
                _context.SaveChanges();
            }
        }
        public void AssignApplication(int applicationId, int OfficerId)
        {
            var application = _context.Applications.FirstOrDefault(a => a.ApplicationId == applicationId);
            if (application != null)
            {
                application.OfficerId = OfficerId;
                application.Status = "Assigned";
                _context.SaveChanges();
            }
        }
        public void ApproveApplication(int applicationId, int approverId)
        {
            var application = _context.Applications.FirstOrDefault(a => a.ApplicationId == applicationId);
            if (application != null)
            {
                application.Status = "Approved";
                application.OfficerId = approverId;
                _context.SaveChanges();
            }
        }
        public void RejectApplication(int applicationId, int approverId, string reason)
        {
            var application = _context.Applications.FirstOrDefault(a => a.ApplicationId == applicationId);
            if (application != null)
            {
                application.Status = "Rejected";
                application.OfficerId = approverId;
                application.RejectionReason = reason;
                _context.SaveChanges();
            }
        }
        

    }
}
