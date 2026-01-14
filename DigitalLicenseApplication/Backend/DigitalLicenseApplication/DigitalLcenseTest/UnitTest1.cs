using DigitalLicenseApplication.Controllers;
using DigitalLicenseApplication.DTOs;
using DigitalLicenseApplication.Interface.Service;
using DigitalLicenseApplication.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace DigitalLcenseTest
{
    public class ApplicationControllerTests
    {
        private readonly Mock<IApplicationservice> _mockService;
        private readonly ApplicationController _controller;

        public ApplicationControllerTests()
        {
            _mockService = new Mock<IApplicationservice>();
            _controller = new ApplicationController(_mockService.Object);
        }

        [Fact]
        public void GetAllApplications_ReturnsOkWithApplications()
        {
            var applications = new List<Application>
            {
                new Application { ApplicationId = 1, FullName = "John Doe", Status = "Pending", User = new User { UserId = 1, Name = "John" } },
                new Application { ApplicationId = 2, FullName = "Jane Doe", Status = "Approved", User = new User { UserId = 2, Name = "Jane" } }
            };
            _mockService.Setup(s => s.GetAllApplications()).Returns(applications);

            var result = _controller.GetAllApplications() as OkObjectResult;

            Assert.NotNull(result);
            var returned = Assert.IsType<List<ApplicationDTO>>(result.Value);
            Assert.Equal(2, returned.Count);
        }

        [Fact]
        public void GetApplicationById_ReturnsNotFound_WhenIdDoesNotExist()
        {
            
            _mockService.Setup(s => s.GetApplicationById(It.IsAny<int>())).Returns((Application)null);

            var result = _controller.GetApplicationById(999);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void ApproveApplication_UpdatesStatusToApproved()
        {
            var app = new Application { ApplicationId = 1, Status = "Pending" };
            _mockService.Setup(s => s.GetApplicationById(1)).Returns(app);

            var result = _controller.ApproveApplication(1, 10) as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal("Approved", app.Status);
            Assert.Equal(10, app.OfficerId);
        }
    }

    public class UserControllerTests
    {
        private readonly Mock<IUserservice> _mockService;
        private readonly UserController _controller;

        public UserControllerTests()
        {
            _mockService = new Mock<IUserservice>();
            var mockEnv = new Mock<Microsoft.AspNetCore.Hosting.IWebHostEnvironment>();
            _controller = new UserController(_mockService.Object, mockEnv.Object);
        }

        [Fact]
        public void GetUserById_ReturnsUser_WhenExists()
        {
            var user = new User { UserId = 1, Name = "John Doe", Email = "john@example.com" };
            _mockService.Setup(s => s.GetUserById(1)).Returns(user);

            var result = _controller.GetUserById(1) as OkObjectResult;

            Assert.NotNull(result);
            var returnedUser = Assert.IsType<User>(result.Value);
            Assert.Equal("John Doe", returnedUser.Name);
        }

        [Fact]
        public void GetUserById_ReturnsNotFound_WhenUserDoesNotExist()
        {
            _mockService.Setup(s => s.GetUserById(It.IsAny<int>())).Returns((User)null);

            var result = _controller.GetUserById(999);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void Register_CreatesUserSuccessfully()
        {
            var dto = new UserRegisterDTO { Name = "Alice", Email = "alice@test.com", Password = "pass123", ContactNumber = "1234567890" };
            _mockService.Setup(s => s.AddUser(It.IsAny<User>())).Verifiable();

            var result = _controller.Register(dto) as CreatedAtActionResult;

            Assert.NotNull(result);
            var createdUser = Assert.IsType<User>(result.Value);
            Assert.Equal("Alice", createdUser.Name);
            _mockService.Verify(s => s.AddUser(It.IsAny<User>()), Times.Once);
        }
    }
}
