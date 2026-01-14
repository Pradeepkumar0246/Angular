using System.ComponentModel.DataAnnotations;

namespace DigitalLicenseApplication.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        [MaxLength(150)]
        public string Email { get; set; }
        [Required]
        [MaxLength(100)]
        public string Password { get; set; }
        public byte[]? ProfileImage { get; set; }
        [Required]
        [MaxLength(20)]
        public string Role { get; set; }
        [Required]
        [Phone]
        [MaxLength(20)]
        public string ContactNumber { get; set; }
        public int? DepartmentId { get; set; }
        public Department? Department { get; set; }
        public ICollection<Application>? Applications { get; set; }

    }
}
