namespace DigitalLicenseApplication.DTOs
{
    public class UserDTO
    {
        public int UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string ContactNumber { get; set; } = string.Empty;
        public int? DepartmentId { get; set; }
    }
}
