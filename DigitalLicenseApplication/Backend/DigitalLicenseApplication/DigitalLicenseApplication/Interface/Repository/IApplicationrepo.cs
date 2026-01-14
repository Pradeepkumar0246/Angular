using DigitalLicenseApplication.Models;

namespace DigitalLicenseApplication.Interface.Repository
{
    public interface IApplicationrepo
    {
        IEnumerable<Application> GetAllApplications();
        Application GetApplicationById(int applicationId);
        IEnumerable<Application> GetApplicationsByUserId(int userId);
        IEnumerable<Application> GetApplicationsByDepartment(int departmentId);
        IEnumerable<Application> GetApplicationsByStatus(string status);
        void SubmitApplication(Application application);
        void UpdateApplication(Application application);
        void DeleteApplication(int applicationId);
    }
}
