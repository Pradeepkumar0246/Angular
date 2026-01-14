using DigitalLicenseApplication.DTOs;
using DigitalLicenseApplication.Interface.Service;
using DigitalLicenseApplication.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DigitalLicenseApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentservice _departmentservice;

        public DepartmentController(IDepartmentservice departmentservice)
        {
            _departmentservice = departmentservice;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Officer,User")]
        public IActionResult GetAllDepartments()
        {
            var departments = _departmentservice.GetAllDepartments();
            return Ok(departments);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Officer,User")]
        public IActionResult GetDepartment(int id)
        {
            var department = _departmentservice.GetDepartmentById(id);
            if (department == null) return NotFound();
            return Ok(department);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult AddDepartment([FromBody] DepartmentPostDTO dto)
        {
            if (dto == null) return BadRequest();

            var department = new Department
            {
                Name = dto.Name,
                Description = dto.Description
            };

            _departmentservice.AddDepartment(department);
            return CreatedAtAction(nameof(GetDepartment), new { id = department.DepartmentId }, department);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdateDepartment(int id, [FromBody] Department department)
        {
            if (department == null || department.DepartmentId != id)
                return BadRequest();

            try
            {
                _departmentservice.UpdateDepartment(department);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteDepartment(int id)
        {
            try
            {
                _departmentservice.DeleteDepartment(id);
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Internal server error" });
            }
        }
    }
}
