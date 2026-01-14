using DigitalLicenseApplication.Models;

namespace DigitalLicenseApplication.Interface.Repository
{
    public interface IUserrepo
    {
        IEnumerable<User> GetAllUsers();
        User GetUserById(int id);
        User GetUserByEmail(string email);
        void AddUser(User user);
        void UpdateUser(User user);
        void DeleteUser(int id);
        IEnumerable<User> Getuserbyrole(string role);
        IEnumerable<User> GetUsersByDepartment(int departmentId);
        User Authenticate(string email, string password);

    }
}
