using System.ComponentModel.DataAnnotations;

namespace DigitalLicenseApplication.DTOs
{
    public class ApplicationPostDTO
    {
        [Required] public int UserId { get; set; }
        [Required] public int FormId { get; set; }
        [Required] public int DepartmentId { get; set; }
        [MaxLength(1000)] public string? Details { get; set; }

        [Required][MaxLength(200)] public string FullName { get; set; }
        [Required][MaxLength(200)] public string FatherName { get; set; }
        [Required][MaxLength(100)] public string GovernmentIdType { get; set; }
        [Required] public IFormFile GovernmentIdProof { get; set; } 
        [Required][MaxLength(50)] public string MaritalStatus { get; set; }
        [Required][MaxLength(10)] public string Gender { get; set; }
        [Required] public bool PhysicallyDisabled { get; set; }
        [MaxLength(500)] public IFormFile? PhysicallyDisabledProofPath { get; set; } 
        [Required][MaxLength(500)] public string PermanentAddress { get; set; }
    }
}
