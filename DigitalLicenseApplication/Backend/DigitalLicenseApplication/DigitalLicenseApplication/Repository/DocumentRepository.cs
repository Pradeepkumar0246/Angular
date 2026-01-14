using DigitalLicenseApplication.Interface.Repository;
using DigitalLicenseApplication.Models;

namespace DigitalLicenseApplication.Repository
{
    public class DocumentRepository : IDocumentrepo
    {
        private readonly AppDbContext _context;
        public DocumentRepository(AppDbContext context)
        {
            _context = context;
        }
        public IEnumerable<Document> GetAllDocumentsByApplicationId(int applicationId)
        {
            return _context.Documents.Where(d => d.ApplicationId == applicationId).ToList();
        }
        public Document GetDocumentById(int id)
        {
            return _context.Documents.FirstOrDefault(d => d.DocumentId == id);
        }
        public void AddDocument(Document document)
        {
            _context.Documents.Add(document);
            _context.SaveChanges();
        }
        public void updateDocument(Document document)
        {
            _context.Documents.Update(document);
            _context.SaveChanges();
        }
        public void DeleteDocument(int id)
        {
            var document = _context.Documents.FirstOrDefault(d => d.DocumentId == id);
            if (document != null)
            {
                _context.Documents.Remove(document);
                _context.SaveChanges();
            }
        }
    }
}
