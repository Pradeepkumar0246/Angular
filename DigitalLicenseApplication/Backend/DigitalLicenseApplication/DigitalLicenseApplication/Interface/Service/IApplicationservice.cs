using DigitalLicenseApplication.Models;

namespace DigitalLicenseApplication.Interface.Service
{
    public interface IApplicationservice
    {
        IEnumerable<Application> GetAllApplications();
        Application GetApplicationById(int applicationId);
        IEnumerable<Application> GetApplicationsByUserId(int userId);
        IEnumerable<Application> GetApplicationsByDepartment(int departmentId);
        IEnumerable<Application> GetApplicationsByStatus(string status);
        void SubmitApplication(Application application);
        void UpdateApplication(Application application);
        void DeleteApplication(int applicationId);
        void AssignApplication(int applicationId, int OfficerId);
        void ApproveApplication(int applicationId, int approverId);
        void RejectApplication(int applicationId, int approverId, string reason);
    }
}
