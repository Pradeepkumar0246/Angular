using DigitalLicenseApplication.Interface.Repository;
using DigitalLicenseApplication.Models;
using Microsoft.EntityFrameworkCore;

namespace DigitalLicenseApplication.Repository
{
    public class UserRepository : IUserrepo
    {
        private readonly AppDbContext _context;
        public UserRepository(AppDbContext context)
        {
            _context = context;
        }
        public IEnumerable<User> GetAllUsers()
        {
            return _context.Users.Include(u => u.Department).Include(u => u.Applications).ToList();
        }
        public User GetUserById(int id)
        {
            return _context.Users.Include(u => u.Department).Include(u=>u.Applications).FirstOrDefault(u => u.UserId == id);
        }
        public User GetUserByEmail(string email)
        {
            return _context.Users.Include(u => u.Department).FirstOrDefault(u => u.Email == email);
        }
        public void AddUser(User user)
        {
            // Enforce role-based department rules
            if (user.Role == "Admin" || user.Role == "User")
            {
                user.DepartmentId = null;
            }
            else if (user.Role == "Officer" && user.DepartmentId == null)
            {
                throw new Exception("Officer must have a department assigned");
            }

            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public void UpdateUser(User user)
        {
            if (user.Role == "Admin" || user.Role == "User")
                user.DepartmentId = null;
            else if (user.Role == "Officer" && user.DepartmentId == null)
                throw new Exception("Officer must have a department assigned");

            _context.Users.Update(user);
            _context.SaveChanges();
        }

        public void DeleteUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }
        public IEnumerable<User> Getuserbyrole(string role)
        {
            return _context.Users.Include(u => u.Department).Where(u => u.Role == role).ToList();
        }
        public IEnumerable<User> GetUsersByDepartment(int departmentId)
        {
            return _context.Users.Include(u => u.Department).Where(u => u.DepartmentId == departmentId).ToList();
        }
        public User Authenticate(string email, string password)
        {
            var user = _context.Users
                .Include(u => u.Department)
                .FirstOrDefault(u => u.Email.ToLower() == email.ToLower() && u.Password == password.Trim());

            return user;
        }


    }
}
