namespace ACPP.API.Models
{
    public class DataverseSearchResponseModel
    {
        public ErrorDetail Error { get; set; }
        public QueryResult[] Value { get; set; }
        public Dictionary<string, FacetResult[]> Facets { get; set; }
        public QueryContext QueryContext { get; set; }
        public long Count { get; set; }
    }

    public class ErrorDetail
    {
        public string Code { get; set; }
        public string Message { get; set; }
        public Dictionary<string, string> PropertyBag { get; set; }
    }

    public class QueryResult
    {
        public string Id { get; set; }
        public string EntityName { get; set; }
        public int ObjectTypeCode { get; set; }
        public Dictionary<string, object> Attributes { get; set; }
        public Dictionary<string, object> Highlights { get; set; }
        public double Score { get; set; }
    }

    public class FacetResult
    {
        public string Value { get; set; }
        public int Count { get; set; }
    }

    public class QueryContext
    {
        public string OriginalQuery { get; set; }
        public string AlteredQuery { get; set; }
        public string[] Reason { get; set; }
        public string[] SpellSuggestions { get; set; }
    }
}
