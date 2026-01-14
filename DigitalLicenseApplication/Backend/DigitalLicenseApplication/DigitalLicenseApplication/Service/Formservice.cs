using DigitalLicenseApplication.Interface.Repository;
using DigitalLicenseApplication.Interface.Service;

namespace DigitalLicenseApplication.Service
{
    public class Formservice:IFormservice
    {
        private readonly IFormrepo _formrepo;
        public Formservice(IFormrepo formrepo)
        {
            _formrepo = formrepo;
        }
        public IEnumerable<Models.Form> GetAllForms()
        {
            return _formrepo.GetAllForms();
        }
        public Models.Form GetFormById(int id)
        {
            return _formrepo.GetFormById(id);
        }
        public IEnumerable<Models.Form> GetFormsByUserId(int userId)
        {
            return _formrepo.GetFormsByUserId(userId);
        }
        public IEnumerable<Models.Form> GetFormsByStatus(string status)
        {
            return _formrepo.GetFormsByStatus(status);
        }
        public void SubmitForm(Models.Form form)
        {
            _formrepo.SubmitForm(form);
        }
        public void UpdateForm(Models.Form form)
        {
            _formrepo.UpdateForm(form);
        }
        public void DeleteForm(int id)
        {
            _formrepo.DeleteForm(id);
        }
        public IEnumerable<Models.Form> GetFormsByDepartment(int departmentId)
        {
            return _formrepo.GetFormsByDepartment(departmentId);
        }
    }
}
