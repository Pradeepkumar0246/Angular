using DigitalLicenseApplication.Interface.Repository;
using DigitalLicenseApplication.Interface.Service;
using DigitalLicenseApplication.Models;

namespace DigitalLicenseApplication.Service
{
    public class Documentservice:IDocumentservice
    {
        private readonly IDocumentrepo _documentrepo;
        public Documentservice(IDocumentrepo documentrepo)
        {
            _documentrepo = documentrepo;
        }
        public IEnumerable<Document> GetAllDocumentsByApplicationId(int applicationId)
        {
            return _documentrepo.GetAllDocumentsByApplicationId(applicationId);
        }
        public Document GetDocumentById(int id)
        {
            return _documentrepo.GetDocumentById(id);
        }
        public void AddDocument(Document document)
        {
            _documentrepo.AddDocument(document);
        }
        public void updateDocument(Document document)
        {
            _documentrepo.updateDocument(document);
        }
        public void DeleteDocument(int id)
        {
            _documentrepo.DeleteDocument(id);
        }

    }
}
