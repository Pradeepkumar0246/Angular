using System.ComponentModel.DataAnnotations;

namespace DigitalLicenseApplication.DTOs
{
    public class UserRegisterDTO
    {
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

        [Phone]
        [MaxLength(20)]
        public string ContactNumber { get; set; }
    }
}
