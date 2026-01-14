using DigitalLicenseApplication.DTOs;
using DigitalLicenseApplication.Interface.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DigitalLicenseApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentController : ControllerBase
    {
        private readonly IDocumentservice _documentservice;
        public DocumentController(IDocumentservice documentservice)
        {
            _documentservice = documentservice;
        }
        [HttpGet("application/{applicationId}")]
        public IActionResult GetAllDocumentsByApplicationId(int applicationId)
        {
            var documents = _documentservice.GetAllDocumentsByApplicationId(applicationId);
            return Ok(documents);
        }
        [HttpGet("{documentid}")]
        public IActionResult GetDocumentById(int documentid)
        {
            var document = _documentservice.GetDocumentById(documentid);
            if (document == null)
            {
                return NotFound();
            }
            return Ok(document);
        }
        [HttpPost]
        public IActionResult AddDocument([FromBody] DocumentPostDTO dto)
        {
            if (dto == null)
            {
                return BadRequest();
            }

            var document = new Models.Document
            {
                ApplicationId = dto.ApplicationId,
                FilePath = dto.FilePath,
                FileType = dto.FileType,
                UploadedDate = DateTime.UtcNow
            };

            _documentservice.AddDocument(document);
            return CreatedAtAction(nameof(GetDocumentById), new { id = document.DocumentId }, document);
        }
        [HttpPost("upload")]
        public async Task<IActionResult> UploadDocument(IFormFile file, [FromForm] int? applicationId)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");
            var uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/upload/Applicationfile/Documents");
            if (!Directory.Exists(uploadsPath))
                Directory.CreateDirectory(uploadsPath);
            var filePath = Path.Combine(uploadsPath, file.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var document = new Models.Document
            {
                ApplicationId = applicationId??0,
                FilePath = $"/upload/Applicationfile/Documents/{file.FileName}", // relative path for frontend
                FileType = Path.GetExtension(file.FileName),
                UploadedDate = DateTime.UtcNow
            };

            _documentservice.AddDocument(document);

            return Ok(new { message = "File uploaded successfully", document });
        }


        [HttpPut("{id}")]
        public IActionResult UpdateDocument(int id, [FromBody] Models.Document document)
        {
            if (document == null || document.DocumentId != id)
            {
                return BadRequest();
            }
            var existingDocument = _documentservice.GetDocumentById(id);
            if (existingDocument == null)
            {
                return NotFound();
            }
            _documentservice.updateDocument(document);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteDocument(int id)
        {
            var existingDocument = _documentservice.GetDocumentById(id);
            if (existingDocument == null)
            {
                return NotFound();
            }
            _documentservice.DeleteDocument(id);
            return NoContent();
        }
    }
}
