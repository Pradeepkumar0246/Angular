using DigitalLicenseApplication.Interface.Repository;
using DigitalLicenseApplication.Interface.Service;
using DigitalLicenseApplication.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DigitalLicenseApplication.Service
{
    public class Userservice : IUserservice
    {
        private readonly IUserrepo _userrepo;
        private readonly IConfiguration _configuration;
        public Userservice(IUserrepo userrepo, IConfiguration configuration)
        {
            _userrepo = userrepo;
            _configuration = configuration;
        }
        public IEnumerable<User> GetAllUsers()
        {
            return _userrepo.GetAllUsers();
        }
        public User GetUserById(int id)
        {
            return _userrepo.GetUserById(id);
        }
        public User GetUserByEmail(string email)
        {
            return _userrepo.GetUserByEmail(email);
        }
        public void AddUser(User user)
        {
            _userrepo.AddUser(user);
        }
        public void UpdateUser(User user)
        {
            _userrepo.UpdateUser(user);
        }
        public void DeleteUser(int id)
        {
            _userrepo.DeleteUser(id);
        }
        public IEnumerable<User> Getuserbyrole(string role)
        {
            return _userrepo.Getuserbyrole(role);
        }
        public IEnumerable<User> GetUsersByDepartment(int departmentId)
        {
            return _userrepo.GetUsersByDepartment(departmentId);
        }
        public User Authenticate(string email, string password)
        {
            return _userrepo.Authenticate(email, password);
        }
        public string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Token"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role)
        };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
