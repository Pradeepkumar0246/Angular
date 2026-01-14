using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DigitalLicenseApplication.Models
{
    public class Application
    {
        [Key]
        public int ApplicationId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int FormId { get; set; }

        [Required]
        public int DepartmentId { get; set; }

        [MaxLength(1000)]
        public string? Details { get; set; }

        [Required]
        [MaxLength(20)]
        public string Status { get; set; }

        [MaxLength(500)]
        public string? RejectionReason { get; set; }

        public int? OfficerId { get; set; }

        public DateTime SubmittedDate { get; set; }

        [Required]
        [MaxLength(100)]
        public string FullName { get; set; }

        [Required]
        [MaxLength(100)]
        public string FatherName { get; set; }

        [Required]
        [MaxLength(50)]
        public string GovernmentIdType { get; set; }

        [Required]
        [MaxLength(100)]
        public string GovernmentIdProof { get; set; } 

        [Required]
        [MaxLength(500)]
        public string UploadedIdProofPath { get; set; } 
        [MaxLength(500)]
        public string? PhysicallyDisabledProofPath { get; set; }

        [Required]
        [MaxLength(20)]
        public string MaritalStatus { get; set; }

        [Required]
        [MaxLength(10)]
        public string Gender { get; set; }

        [Required]
        public bool PhysicallyDisabled { get; set; }

        [Required]
        [MaxLength(300)]
        public string PermanentAddress { get; set; }

        public User? User { get; set; }
        public Form? Form { get; set; }
        public Department? Department { get; set; }
        public User? Officer { get; set; }
        public ICollection<Document>? Documents { get; set; }
    }
}
