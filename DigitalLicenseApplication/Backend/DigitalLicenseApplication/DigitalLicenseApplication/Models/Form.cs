using System.ComponentModel.DataAnnotations;

namespace DigitalLicenseApplication.Models
{
    public class Form
    {
        [Key]
        public int FormId { get; set; }

        [MaxLength(150)]
        public string? Title { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }

        public int? DepartmentId { get; set; }
        public Department? Department { get; set; }
        public ICollection<Application>? Applications { get; set; }
    }
}
