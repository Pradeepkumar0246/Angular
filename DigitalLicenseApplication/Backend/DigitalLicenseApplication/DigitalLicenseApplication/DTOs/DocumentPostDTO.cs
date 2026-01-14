using System.ComponentModel.DataAnnotations;

namespace DigitalLicenseApplication.DTOs
{
    public class DocumentPostDTO
    {
        [Required]
        public int ApplicationId { get; set; }

        [Required]
        [MaxLength(500)]
        public string FilePath { get; set; }

        [MaxLength(100)]
        public string? FileType { get; set; }
    }
}
