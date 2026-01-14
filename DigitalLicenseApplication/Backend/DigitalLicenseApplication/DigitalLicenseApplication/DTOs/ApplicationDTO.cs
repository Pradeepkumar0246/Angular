namespace DigitalLicenseApplication.DTOs
{
    public class ApplicationDTO
    {
        public int ApplicationId { get; set; }
        public int UserId { get; set; }
        public int FormId { get; set; }
        public int DepartmentId { get; set; }
        public string Details { get; set; }
        public string FullName { get; set; }
        public string FatherName { get; set; }
        public string GovernmentIdType { get; set; }
        public string GovernmentIdProof { get; set; }
        public string UploadedIdProofPath { get; set; }
        public string MaritalStatus { get; set; }
        public string Gender { get; set; }
        public bool PhysicallyDisabled { get; set; }
        public string PhysicallyDisabledProofPath { get; set; }
        public string PermanentAddress { get; set; }
        public string Status { get; set; }
        public DateTime SubmittedDate { get; set; }
        public int? OfficerId { get; set; }
        public string RejectionReason { get; set; }
        public UserDTO User { get; set; }
    }
}
