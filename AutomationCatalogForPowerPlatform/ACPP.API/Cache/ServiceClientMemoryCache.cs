namespace ACPP.API.Cache
{
    using Microsoft.Extensions.Caching.Memory;
    using Microsoft.Extensions.Logging;
    using System;
    using System.Threading.Tasks;

    public class ServiceClientMemoryCache : IServiceClientMemoryCache
    {
        private ILogger<ServiceClientMemoryCache> _logger;

        /// <summary>
        /// .net core memory cache.
        /// </summary>
        private readonly IMemoryCache _memoryCache;

        public ServiceClientMemoryCache(ILogger<ServiceClientMemoryCache> logger, IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
            _logger = logger;
        }

        public void ClearCache()
        {
            _memoryCache.Dispose();
        }

        public async Task<T> GetCacheItemAsync<T>(string key) where T : class
        {
            if (!string.IsNullOrEmpty(key))
            {
                _memoryCache.TryGetValue(key, out T value);
                _logger.LogInformation("Cache hit for key: {0}", key);
                return value;
            }
            return null;
        }

        /// <summary>
        /// Writes a item to the cache (identified by its key).
        /// SlidingExpiration is set to 10 minutes by default.
        /// </summary>
        public async Task WriteCacheItemAsync(ServiceClientMemoryCacheItem args)
        {
            if (args.ObjectToCache != null)
            {
                // Cache update
                await WriteCacheStoreAsync(
                    args.Key,
                    args.ObjectToCache,
                    args.SuggestedCacheExpiry);
                _logger.LogInformation("Cache updated for key: {0}", args.Key);
            }
            else
            {
                // Remove cache entry
                await RemoveKeyAsync(args.Key).ConfigureAwait(false);
            }
        }

        /// <summary>
        /// Writes a token cache blob to the serialization cache (identified by its key).
        /// </summary>
        /// <param name="cacheKey">Token cache key.</param>
        /// <param name="itemToCache">The item to cache..</param>
        /// <param name="suggestedExpiry">The timespan for cache item expiry, default to 14 days.</param>
        /// <returns>A <see cref="Task"/> that completes when a write operation has completed.</returns>
        private Task WriteCacheStoreAsync(
            string cacheKey,
            object itemToCache,
            TimeSpan? suggestedExpiry)
        {

            MemoryCacheEntryOptions memoryCacheEntryOptions = new MemoryCacheEntryOptions()
            {
                AbsoluteExpirationRelativeToNow = suggestedExpiry ?? TimeSpan.FromDays(14),
                SlidingExpiration = TimeSpan.FromMinutes(10)
            };

            _memoryCache.Set(cacheKey, itemToCache, memoryCacheEntryOptions);

            return Task.CompletedTask;
        }

        /// <summary>
        /// Removes a token cache identified by its key, from the serialization
        /// cache.
        /// </summary>
        /// <param name="cacheKey">token cache key.</param>
        /// <returns>A <see cref="Task"/> that completes when key removal has completed.</returns>
        private Task RemoveKeyAsync(string cacheKey)
        {
            _memoryCache.Remove(cacheKey);
            _logger.LogInformation("Cache removed for key: {0}", cacheKey);
            return Task.CompletedTask;
        }
    }
}
