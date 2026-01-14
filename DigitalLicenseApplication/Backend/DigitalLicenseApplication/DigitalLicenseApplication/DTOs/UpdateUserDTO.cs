namespace DigitalLicenseApplication.DTOs
{
    public class UpdateUserDTO
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string ContactNumber { get; set; } = string.Empty;
        public IFormFile? ProfileImage { get; set; }
    }
}
