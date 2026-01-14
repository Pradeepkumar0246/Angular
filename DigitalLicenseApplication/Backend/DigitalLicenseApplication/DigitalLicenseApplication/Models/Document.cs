using System.ComponentModel.DataAnnotations;

namespace DigitalLicenseApplication.Models
{
    public class Document
    {
        [Key]
        public int DocumentId { get; set; }

        [Required]
        public int ApplicationId { get; set; }

        [Required]
        [MaxLength(500)]
        public string FilePath { get; set; }

        [MaxLength(100)]
        public string? FileType { get; set; }

        public DateTime? UploadedDate { get; set; }
        public Application? Application { get; set; }

    }
}
