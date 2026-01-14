using DigitalLicenseApplication.DTOs;
using DigitalLicenseApplication.Interface.Service;
using DigitalLicenseApplication.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalLicenseApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationController : ControllerBase
    {
        private readonly IApplicationservice _applicationservice;

        public ApplicationController(IApplicationservice applicationservice)
        {
            _applicationservice = applicationservice;
        }

        //[HttpGet]
        //public IActionResult GetAllApplications()
        //{
        //    var applications = _applicationservice.GetAllApplications();
        //    return Ok(applications);
        //}

        //[HttpGet("{applicationId}")]
        //public IActionResult GetApplicationById(int applicationId)
        //{
        //    var application = _applicationservice.GetApplicationById(applicationId);
        //    if (application == null) return NotFound();
        //    return Ok(application);
        //}

        [HttpGet]
        public IActionResult GetAllApplications()
        {
            var applications = _applicationservice.GetAllApplications()
                .Select(a => new ApplicationDTO
                {
                    ApplicationId = a.ApplicationId,
                    UserId = a.UserId,
                    FormId = a.FormId,
                    DepartmentId = a.DepartmentId,
                    Details = a.Details,
                    FullName = a.FullName,
                    FatherName = a.FatherName,
                    GovernmentIdType = a.GovernmentIdType,
                    GovernmentIdProof = a.GovernmentIdProof,
                    UploadedIdProofPath = a.UploadedIdProofPath,
                    MaritalStatus = a.MaritalStatus,
                    Gender = a.Gender,
                    PhysicallyDisabled = a.PhysicallyDisabled,
                    PhysicallyDisabledProofPath = a.PhysicallyDisabledProofPath,
                    PermanentAddress = a.PermanentAddress,
                    Status = a.Status,
                    SubmittedDate = a.SubmittedDate,
                    OfficerId = a.OfficerId,
                    RejectionReason = a.RejectionReason,
                    User = new UserDTO   
                    {
                        UserId = a.User.UserId,
                        Name = a.User.Name,
                        Email = a.User.Email,
                        Role = a.User.Role,
                        ContactNumber = a.User.ContactNumber,
                        DepartmentId = a.User.DepartmentId
                    }
                }).ToList();

            return Ok(applications);
        }

        [HttpGet("{applicationId}")]
        public IActionResult GetApplicationById(int applicationId)
        {
            var application = _applicationservice.GetApplicationById(applicationId);
            if (application == null) return NotFound();

            var dto = new ApplicationDTO
            {
                ApplicationId = application.ApplicationId,
                UserId = application.UserId,
                FormId = application.FormId,
                DepartmentId = application.DepartmentId,
                Details = application.Details,
                FullName = application.FullName,
                FatherName = application.FatherName,
                GovernmentIdType = application.GovernmentIdType,
                GovernmentIdProof = application.GovernmentIdProof,
                UploadedIdProofPath = application.UploadedIdProofPath,
                MaritalStatus = application.MaritalStatus,
                Gender = application.Gender,
                PhysicallyDisabled = application.PhysicallyDisabled,
                PhysicallyDisabledProofPath = application.PhysicallyDisabledProofPath,
                PermanentAddress = application.PermanentAddress,
                Status = application.Status,
                SubmittedDate = application.SubmittedDate,
                OfficerId = application.OfficerId,
                RejectionReason = application.RejectionReason,
                User = new UserDTO
                {
                    UserId = application.User.UserId,
                    Name = application.User.Name,
                    Email = application.User.Email,
                    Role = application.User.Role,
                    ContactNumber = application.User.ContactNumber,
                    DepartmentId = application.User.DepartmentId
                }
            };

            return Ok(dto);
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetApplicationsByUser(int userId)
        {
            var applications = _applicationservice.GetApplicationsByUserId(userId);

            return Ok(applications);
        }

        [HttpGet("department/{departmentId}")]
        public IActionResult GetApplicationsByDepartment(int departmentId, [FromQuery] string? status)
        {
            var applications = _applicationservice.GetApplicationsByDepartment(departmentId);
            if (!string.IsNullOrEmpty(status))
            {
                applications = applications.Where(a => a.Status.Equals(status, System.StringComparison.OrdinalIgnoreCase)).ToList();
            }
            return Ok(applications);
        }

        [HttpPost]
        public async Task<IActionResult> SubmitApplication(
            [FromForm] ApplicationPostDTO dto,
            IFormFile governmentIdProof,
            IFormFile? physicallyDisabledProof
        )
        {
            if (dto == null) return BadRequest();

            string govFilePath = string.Empty;
            string physFilePath = string.Empty;

            var uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/upload/Applicationfile/Documents");
            if (!Directory.Exists(uploadsPath))
                Directory.CreateDirectory(uploadsPath);

           
            if (governmentIdProof != null && governmentIdProof.Length > 0)
            {
                var govPath = Path.Combine(uploadsPath, governmentIdProof.FileName);
                using (var stream = new FileStream(govPath, FileMode.Create))
                {
                    await governmentIdProof.CopyToAsync(stream);
                }
                govFilePath = $"/upload/Applicationfile/Documents/{governmentIdProof.FileName}";
            }

          
            if (physicallyDisabledProof != null && physicallyDisabledProof.Length > 0)
            {
                var physPath = Path.Combine(uploadsPath, physicallyDisabledProof.FileName);
                using (var stream = new FileStream(physPath, FileMode.Create))
                {
                    await physicallyDisabledProof.CopyToAsync(stream);
                }
                physFilePath = $"/upload/Applicationfile/Documents/{physicallyDisabledProof.FileName}";
            }

            var application = new Application
            {
                UserId = dto.UserId,
                FormId = dto.FormId,
                DepartmentId = dto.DepartmentId,
                Details = dto.Details,
                FullName = dto.FullName,
                FatherName = dto.FatherName,
                GovernmentIdType = dto.GovernmentIdType,
                GovernmentIdProof = govFilePath,
                UploadedIdProofPath = "upload_data", 
                MaritalStatus = dto.MaritalStatus,
                Gender = dto.Gender,
                PhysicallyDisabled = dto.PhysicallyDisabled,
                PhysicallyDisabledProofPath = physFilePath,
                PermanentAddress = dto.PermanentAddress,
                Status = "Pending",
                SubmittedDate = System.DateTime.UtcNow
            };

            _applicationservice.SubmitApplication(application);
            return Ok(new { message = "Application submitted successfully", application });
        }

        [HttpPut("{id}")]
        public IActionResult UpdateApplication(int id, Application application)
        {
            if (application == null || application.ApplicationId != id) return BadRequest();

            var existingApplication = _applicationservice.GetApplicationById(id);
            if (existingApplication == null) return NotFound();

            _applicationservice.UpdateApplication(application);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,User")]
        public IActionResult DeleteApplication(int id)
        {
            _applicationservice.DeleteApplication(id);
            return NoContent();
        }

        
        [HttpPut("{id}/approve")]
        [Authorize(Roles = "Officer,Admin")]
        public IActionResult ApproveApplication(int id, [FromQuery] int officerId)
        {
            var application = _applicationservice.GetApplicationById(id);
            if (application == null) return NotFound();

            application.Status = "Approved";
            application.OfficerId = officerId;

            _applicationservice.UpdateApplication(application);
            return Ok(new { message = "Application approved successfully" });
        }

        
        [HttpPut("{id}/reject")]
        [Authorize(Roles = "Officer,Admin")]
        public IActionResult RejectApplication(int id, [FromBody] RejectDTO dto)
        {
            var application = _applicationservice.GetApplicationById(id);
            if (application == null)
                return NotFound();

            application.Status = "Rejected";
            application.RejectionReason = dto.Reason;
            application.OfficerId = dto.OfficerId;

            _applicationservice.UpdateApplication(application);

            return Ok(new { message = "Application rejected successfully" });
        }

        public class RejectDTO
        {
            public string Reason { get; set; }
            public int OfficerId { get; set; }
        }
    }
}
