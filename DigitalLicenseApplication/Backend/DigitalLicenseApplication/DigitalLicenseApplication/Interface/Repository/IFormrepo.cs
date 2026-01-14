using DigitalLicenseApplication.Models;

namespace DigitalLicenseApplication.Interface.Repository
{
    public interface IFormrepo
    {
        IEnumerable<Form> GetAllForms();
        Form GetFormById(int id);
        IEnumerable<Form> GetFormsByUserId(int userId);
        IEnumerable<Form> GetFormsByStatus(string status);
        void SubmitForm(Form form);
        void UpdateForm(Form form);
        void DeleteForm(int id);
        IEnumerable<Form> GetFormsByDepartment(int departmentId);

    }
}
