using System.ComponentModel.DataAnnotations;

namespace DigitalLicenseApplication.Models
{
    public class Department
    {
        [Key]
        public int DepartmentId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }

        public ICollection<Form>? Forms { get; set; }
        public ICollection<User>? Officers { get; set; }
        public ICollection<Application>? Applications { get; set; }

    }
}
