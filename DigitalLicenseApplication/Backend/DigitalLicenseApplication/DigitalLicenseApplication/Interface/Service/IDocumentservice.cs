using DigitalLicenseApplication.Models;

namespace DigitalLicenseApplication.Interface.Service
{
    public interface IDocumentservice
    {
        IEnumerable<Document> GetAllDocumentsByApplicationId(int applicationId);
        Document GetDocumentById(int id);
        void AddDocument(Document document);
        void updateDocument(Document document);
        void DeleteDocument(int id);
    }
}
