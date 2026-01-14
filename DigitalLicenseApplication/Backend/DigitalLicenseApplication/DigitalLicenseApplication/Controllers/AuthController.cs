using DigitalLicenseApplication.DTOs;
using DigitalLicenseApplication.Interface.Service;
using DigitalLicenseApplication.Models;
using Microsoft.AspNetCore.Mvc;

namespace DigitalLicenseApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserservice _userservice;

        public AuthController(IUserservice userservice)
        {
            _userservice = userservice;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLoginDTO loginDTO)
        {
            if (loginDTO == null || string.IsNullOrEmpty(loginDTO.Email) || string.IsNullOrEmpty(loginDTO.Password))
            {
                return BadRequest("Email and password are required.");
            }

            var user = _userservice.Authenticate(loginDTO.Email, loginDTO.Password);
            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            var token = _userservice.GenerateJwtToken(user);

            
            return Ok(new { token = token, user = user });
        }
    }
}
