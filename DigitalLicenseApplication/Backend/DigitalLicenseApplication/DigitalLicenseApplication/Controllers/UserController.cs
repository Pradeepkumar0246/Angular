using DigitalLicenseApplication.DTOs;
using DigitalLicenseApplication.Interface.Service;
using DigitalLicenseApplication.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;

namespace DigitalLicenseApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserservice _userService;
        private readonly IWebHostEnvironment _env;
        private readonly ILogger<UserController> _logger;

        public UserController(IUserservice userService, IWebHostEnvironment env, ILogger<UserController> logger)
        {
            _userService = userService;
            _env = env;
            _logger = logger;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Officer")]
        public IActionResult GetAllUsers()
        {
            return Ok(_userService.GetAllUsers());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Officer,User")]
        public IActionResult GetUserById(int id)
        {
            _logger.LogInformation("GetUserById called with id: {UserId}", id);
            var user = _userService.GetUserById(id);
            if (user == null)
            {
                _logger.LogWarning("User with id {UserId} not found", id);
                return NotFound();
            }
            _logger.LogInformation("User with id {UserId} retrieved successfully", id);
            return Ok(user);
        }
        [HttpGet("GetUsersDTO")]
        [Authorize(Roles = "Admin,Officer")]
        public IActionResult GetUsersDTO()
        {
            var users = _userService.GetAllUsers()
                .Select(u => new UserDTO
                {
                    UserId = u.UserId,
                    Name = u.Name,
                    Email = u.Email,
                    Role = u.Role,
                    ContactNumber = u.ContactNumber,
                    DepartmentId = u.DepartmentId
                }).ToList();

            return Ok(users);
        }
        [HttpGet("GetUserDTO/{id}")]
        [Authorize(Roles = "Admin,Officer,User")]
        public IActionResult GetUserDTOById(int id)
        {
            var user = _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }

            var userDto = new UserDTO
            {
                UserId = user.UserId,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role,
                ContactNumber = user.ContactNumber,
                DepartmentId = user.DepartmentId
            };

            return Ok(userDto);
        }


        [HttpPost("register")]
        public IActionResult Register([FromBody] UserRegisterDTO dto)
        {
            if (dto == null)
            {
                _logger.LogError("Register called with null DTO");
                return BadRequest();
            }

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = dto.Password,
                ContactNumber = dto.ContactNumber,
                Role = "User",
                DepartmentId = null
            };

            _userService.AddUser(user);
            _logger.LogInformation("User {UserName} registered successfully with email {Email}", user.Name, user.Email);
            return CreatedAtAction(nameof(GetUserById), new { id = user.UserId }, user);
        }

        
        [HttpPost("addAdmin")]
        public IActionResult AddAdmin([FromBody] UserAdminDTO dto)
        {
            if (dto == null) return BadRequest();

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = dto.Password,
                ContactNumber = dto.ContactNumber,
                Role = "Admin"
            };

            _userService.AddUser(user);
            return CreatedAtAction(nameof(GetUserById), new { id = user.UserId }, user);
        }

        
        [HttpPost("addOfficer")]
        //[Authorize(Roles = "Admin")]
        [Authorize(Roles=Constants.AdminRole)]
        public IActionResult AddOfficer([FromBody] UserAdminDTO dto)
        {
            if (dto == null) return BadRequest();
            if (dto.DepartmentId == null) return BadRequest("Officer must have a department assigned");

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = dto.Password,
                ContactNumber = dto.ContactNumber,
                Role = "Officer",
                DepartmentId = dto.DepartmentId
            };

            _userService.AddUser(user);
            return CreatedAtAction(nameof(GetUserById), new { id = user.UserId }, user);
        }

        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateUser(int id, [FromForm] UpdateUserDTO dto)
        {
            var existingUser = _userService.GetUserById(id);
            if (existingUser == null)
            {
                _logger.LogWarning("UpdateUser: User with id {UserId} not found", id);
                return NotFound();
            }

            existingUser.Name = dto.Name;
            existingUser.Email = dto.Email;
            existingUser.ContactNumber = dto.ContactNumber;

            
            if (existingUser.Role == "Admin" || existingUser.Role == "User")
                existingUser.DepartmentId = null;

            if (dto.ProfileImage != null)
            {
                using var ms = new MemoryStream();
                await dto.ProfileImage.CopyToAsync(ms);
                existingUser.ProfileImage = ms.ToArray();
            }

            _userService.UpdateUser(existingUser);
            _logger.LogInformation("User {UserId} updated successfully", id);
            return NoContent();
        }

       
        [HttpDelete("{id}")]
        //[Authorize(Roles = "Admin")]
        [Authorize(Roles=Constants.AdminRole)]
        public IActionResult DeleteUser(int id)
        {
            var user = _userService.GetUserById(id);
            if (user == null) return NotFound();

            _userService.DeleteUser(id);
            return NoContent();
        }

       
        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLoginDTO dto)
        {
            if (dto == null) return BadRequest();

            var user = _userService.Authenticate(dto.Email, dto.Password);
            if (user == null) return Unauthorized("Invalid credentials");

            var token = _userService.GenerateJwtToken(user);
            return Ok(new { user, token });
        }
    }
}
