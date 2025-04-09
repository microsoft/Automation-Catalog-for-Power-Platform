namespace ACPP.API.Cache
{
    public class ServiceClientMemoryCacheItem
    {
        public string ItemKey { get; set; } = string.Empty;
        public MemoryCacheItemType? ItemType { get; set; }
        public CancellationToken CancellationToken { get; set; } = CancellationToken.None;
        public TimeSpan? SuggestedCacheExpiry { get; set; }
        public object ObjectToCache { get; set; }
        public string Key
        {
            get
            {
                return $"{ItemType ?? MemoryCacheItemType.Common}:{ItemKey}";
            }
        }
    }

    public enum MemoryCacheItemType
    {
        Common = 0,
        TableClient = 1,
        CardsData = 2,
    }
}
