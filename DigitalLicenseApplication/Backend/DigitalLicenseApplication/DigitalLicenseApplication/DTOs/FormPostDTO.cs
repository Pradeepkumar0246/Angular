using System.ComponentModel.DataAnnotations;

namespace DigitalLicenseApplication.DTOs
{
    public class FormPostDTO
    {
        [MaxLength(150)]
        public string? Title { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }

        public int? DepartmentId { get; set; }
    }
}
