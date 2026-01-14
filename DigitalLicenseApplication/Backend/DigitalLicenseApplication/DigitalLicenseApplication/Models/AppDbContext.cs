using Microsoft.EntityFrameworkCore;

namespace DigitalLicenseApplication.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Form> Forms { get; set; }
        public DbSet<Application> Applications { get; set; }
        public DbSet<Document> Documents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //User - Department 
            modelBuilder.Entity<User>()
                .HasOne(u => u.Department)
                .WithMany(d => d.Officers)
                .HasForeignKey(u => u.DepartmentId)
                .OnDelete(DeleteBehavior.Restrict);

            //Form - Department
            modelBuilder.Entity<Form>()
                .HasOne(f => f.Department)
                .WithMany(d => d.Forms)
                .HasForeignKey(f => f.DepartmentId)
                .OnDelete(DeleteBehavior.Cascade);

            //Application - User
            modelBuilder.Entity<Application>()
                .HasOne(a => a.User)
                .WithMany(u => u.Applications)
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            //Application - Department
            modelBuilder.Entity<Application>()
                .HasOne(a => a.Department)
                .WithMany(d => d.Applications)
                .HasForeignKey(a => a.DepartmentId)
                .OnDelete(DeleteBehavior.Restrict);

            //Application - Form
            modelBuilder.Entity<Application>()
                .HasOne(a => a.Form)
                .WithMany(f => f.Applications)
                .HasForeignKey(a => a.FormId)
                .OnDelete(DeleteBehavior.Cascade);

            //Application - Officer 
            modelBuilder.Entity<Application>()
                .HasOne(a => a.Officer)
                .WithMany()
                .HasForeignKey(a => a.OfficerId)
                .OnDelete(DeleteBehavior.Restrict);

            //Document - Application
            modelBuilder.Entity<Document>()
                .HasOne(d => d.Application)
                .WithMany(a => a.Documents)
                .HasForeignKey(d => d.ApplicationId)
                .OnDelete(DeleteBehavior.Cascade);

            //Default Values and Constraints
            modelBuilder.Entity<Application>()
                .Property(a => a.Status)
                .HasDefaultValue("Pending")
                .IsRequired()
                .HasMaxLength(20);

            modelBuilder.Entity<Application>()
                .Property(a => a.FullName)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Application>()
                .Property(a => a.FatherName)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Application>()
                .Property(a => a.GovernmentIdType)
                .IsRequired()
                .HasMaxLength(50);

            modelBuilder.Entity<Application>()
                .Property(a => a.GovernmentIdProof)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Application>()
                .Property(a => a.UploadedIdProofPath)
                .IsRequired()
                .HasMaxLength(500);

            modelBuilder.Entity<Application>()
                .Property(a => a.MaritalStatus)
                .IsRequired()
                .HasMaxLength(20);

            modelBuilder.Entity<Application>()
                .Property(a => a.Gender)
                .IsRequired()
                .HasMaxLength(10);

            modelBuilder.Entity<Application>()
                .Property(a => a.PhysicallyDisabled)
                .IsRequired();

            modelBuilder.Entity<Application>()
                .Property(a => a.PermanentAddress)
                .IsRequired()
                .HasMaxLength(300);


            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .IsRequired()
                .HasMaxLength(20);

            // Departments
            modelBuilder.Entity<Department>().HasData(
                new Department { DepartmentId = 1, Name = "Transport", Description = "Handles all transport-related licenses and permits." },
                new Department { DepartmentId = 2, Name = "Health Safety & Environment", Description = "Responsible for health, safety, and environmental regulations." },
                new Department { DepartmentId = 3, Name = "Fire Safety", Description = "Manages fire safety regulations and permits." },
                new Department { DepartmentId = 4, Name = "Building & Construction", Description = "Oversees building and construction permits and regulations." }
            );

            // Users
            modelBuilder.Entity<User>().HasData(
                new User { UserId = 1, Name = "Admin", Email = "admin@gmail.com", Password = "admin", Role = "Admin", ContactNumber = "1234567890" },
                new User { UserId = 2, Name = "Officer1", Email = "officer1@gmail.com", Password = "officer1", Role = "Officer", ContactNumber = "0987654321", DepartmentId = 1 },
                new User { UserId = 3, Name = "Officer2", Email = "officer2@gmail.com", Password = "officer2", Role = "Officer", ContactNumber = "1122334455", DepartmentId = 2 },
                new User { UserId = 4, Name = "Officer3", Email = "officer3@gmail.com", Password = "officer3", Role = "Officer", ContactNumber = "2233445566", DepartmentId = 3 },
                new User { UserId = 5, Name = "Officer4", Email = "officer4@gmail.com", Password = "officer4", Role = "Officer", ContactNumber = "3344556677", DepartmentId = 4 },
                new User { UserId = 6, Name = "User1", Email = "user1@gmail.com", Password = "user1", Role = "User", ContactNumber = "1122334455" }
            );

            // Forms
            modelBuilder.Entity<Form>().HasData(
                new Form { FormId = 1, Title = "Driver's License Application", Description = "Application for obtaining a driver's license.", DepartmentId = 1 },
                new Form { FormId = 2, Title = "Vehicle Registration", Description = "Form for registering a new vehicle.", DepartmentId = 1 },
                new Form { FormId = 3, Title = "Health Permit Application", Description = "Application for health permits for businesses.", DepartmentId = 2 },
                new Form { FormId = 4, Title = "Environmental Clearance", Description = "Form for applying for environmental clearances.", DepartmentId = 2 },
                new Form { FormId = 5, Title = "Fire Safety Certificate", Description = "Application for obtaining a fire safety certificate.", DepartmentId = 3 },
                new Form { FormId = 6, Title = "Building Permit Application", Description = "Application for applying for building permits.", DepartmentId = 4 },
                new Form { FormId = 7, Title = "Construction License", Description = "Application for construction licenses.", DepartmentId = 4 }
            );

            // Applications with new fields placeholders
            modelBuilder.Entity<Application>().HasData(
    new Application
    {
        ApplicationId = 1,
        UserId = 6,
        FormId = 1,
        DepartmentId = 1,
        Details = "Applying for a new driver's license.",
        Status = "Pending",
        SubmittedDate = new DateTime(2025, 9, 21),
        FullName = "User One",
        FatherName = "Father One",
        GovernmentIdType = "Aadhaar",
        GovernmentIdProof = "aadhaar.pdf",
        UploadedIdProofPath = "/upload/Applicationfile/Documents/aadhaar.pdf",
        MaritalStatus = "Single",
        Gender = "Male",
        PhysicallyDisabled = false,
        PermanentAddress = "123, Main Street, City, State"
    },
    new Application
    {
        ApplicationId = 2,
        UserId = 6,
        FormId = 3,
        DepartmentId = 2,
        Details = "Requesting health permit for my restaurant.",
        Status = "Pending",
        SubmittedDate = new DateTime(2025, 9, 21),
        FullName = "User One",
        FatherName = "Father One",
        GovernmentIdType = "Aadhaar",
        GovernmentIdProof = "aadhaar.pdf",
        UploadedIdProofPath = "/upload/Applicationfile/Documents/aadhaar.pdf",
        MaritalStatus = "Single",
        Gender = "Male",
        PhysicallyDisabled = false,
        PermanentAddress = "123, Main Street, City, State"
    }
);


            modelBuilder.Entity<Document>().HasData(
                new Document { DocumentId = 1, ApplicationId = 1, FileType = "identity_proof.pdf", FilePath = "/upload/Applicationfile/Documents/Vehical_doc.pdf" },
                new Document { DocumentId = 2, ApplicationId = 2, FileType = "business_license.pdf", FilePath = "/upload/Applicationfile/Documents/Vehical_doc.pdf" }
            );
        }
    }
}
