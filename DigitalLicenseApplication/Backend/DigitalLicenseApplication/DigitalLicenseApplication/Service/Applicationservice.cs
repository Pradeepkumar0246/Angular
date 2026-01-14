using DigitalLicenseApplication.Interface.Repository;
using DigitalLicenseApplication.Interface.Service;
using DigitalLicenseApplication.Models;
using Microsoft.EntityFrameworkCore;
namespace DigitalLicenseApplication.Service
{
    public class Applicationservice : IApplicationservice
    {
        private readonly IApplicationrepo _applicationrepo;
        public Applicationservice(IApplicationrepo applicationrepo)
        {
            _applicationrepo = applicationrepo;
        }
        public IEnumerable<Application> GetAllApplications()
        {
            return _applicationrepo.GetAllApplications();
        }
        public Application GetApplicationById(int applicationId)
        {
            return _applicationrepo.GetApplicationById(applicationId);
        }
        public IEnumerable<Application> GetApplicationsByUserId(int userId)
        {
            return _applicationrepo.GetApplicationsByUserId(userId);
        }
        public IEnumerable<Application> GetApplicationsByDepartment(int departmentId)
        {
            return _applicationrepo.GetApplicationsByDepartment(departmentId);
        }
        public IEnumerable<Application> GetApplicationsByStatus(string status)
        {
            return _applicationrepo.GetApplicationsByStatus(status);
        }
        public void SubmitApplication(Application application)
        {
            _applicationrepo.SubmitApplication(application);
        }
        public void UpdateApplication(Application application)
        {
            _applicationrepo.UpdateApplication(application);
        }
        public void DeleteApplication(int applicationId)
        {
            _applicationrepo.DeleteApplication(applicationId);
        }
        public void AssignApplication(int applicationId, int OfficerId)
        {
            var application = _applicationrepo.GetApplicationById(applicationId);
            if (application != null)
            {
                application.OfficerId = OfficerId;
                application.Status = "Assigned";
                _applicationrepo.UpdateApplication(application);
            }
        }
        public void ApproveApplication(int applicationId, int approverId)
        {
            var application = _applicationrepo.GetApplicationById(applicationId);

            if (application != null)
            {
                application.OfficerId = approverId;
                application.Status = "Approved";
                _applicationrepo.UpdateApplication(application);
            }
        }
        public void RejectApplication(int applicationId, int approverId, string reason)
        {
            var application = _applicationrepo.GetApplicationById(applicationId);
            if (application != null)
            {
                application.OfficerId = approverId;
                application.Status = "Rejected";
                application.RejectionReason = reason;
                _applicationrepo.UpdateApplication(application);
            }
        }
       

    }
}

