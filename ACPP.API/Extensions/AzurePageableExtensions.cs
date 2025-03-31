using Azure;

namespace ACPP.API.Extensions
{
    public static class AzurePageableExtensions
    {
        public static async Task<List<T>> ToList<T>(this AsyncPageable<T> data) where T : notnull
        {
            List<T> listItems = new List<T>();
            await foreach (Page<T> page in data.AsPages())
            {
                listItems.AddRange(page.Values);
            }
            return listItems;
        }
    }
}
