using DigitalLicenseApplication.DTOs;
using DigitalLicenseApplication.Interface.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DigitalLicenseApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormController : ControllerBase
    {
        private readonly IFormservice _formservice;
        public FormController(IFormservice formservice)
        {
            _formservice = formservice;
        }
        [HttpGet]
        public IActionResult GetAllForms()
        {
            var forms = _formservice.GetAllForms();
            return Ok(forms);
        }
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Officer,User")]
        public IActionResult GetFormById(int id)
        {
            var form = _formservice.GetFormById(id);
            if (form == null)
            {
                return NotFound();
            }
            return Ok(form);
        }
        [HttpGet("user/{userId}")]
        public IActionResult GetFormsByUserId(int userId)
        {
            var forms = _formservice.GetFormsByUserId(userId);
            return Ok(forms);
        }
        [HttpGet("status/{status}")]
        public IActionResult GetFormsByStatus(string status)
        {
            var forms = _formservice.GetFormsByStatus(status);
            return Ok(forms);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult SubmitForm([FromBody] FormPostDTO dto)
        {
            if (dto == null)
            {
                return BadRequest();
            }

            var form = new Models.Form
            {
                Title = dto.Title,
                Description = dto.Description,
                DepartmentId = dto.DepartmentId
            };

            _formservice.SubmitForm(form);
            return CreatedAtAction(nameof(GetFormById), new { id = form.FormId }, form);
        }
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdateForm(int id, [FromBody] Models.Form form)
        {
            if (form == null || form.FormId != id)
            {
                return BadRequest();
            }
            var existingForm = _formservice.GetFormById(id);
            if (existingForm == null)
            {
                return NotFound();
            }
            _formservice.UpdateForm(form);
            return NoContent();
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteForm(int id)
        {
            var existingForm = _formservice.GetFormById(id);
            if (existingForm == null)
            {
                return NotFound();
            }
            _formservice.DeleteForm(id);
            return NoContent();
        }
        [HttpGet("department/{departmentId}")]
        public IActionResult GetFormsByDepartment(int departmentId)
        {
            var forms = _formservice.GetFormsByDepartment(departmentId);
            return Ok(forms);
        }
    }
}
