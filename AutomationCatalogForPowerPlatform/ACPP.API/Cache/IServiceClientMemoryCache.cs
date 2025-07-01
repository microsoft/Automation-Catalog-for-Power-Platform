// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace ACPP.API.Cache
{
    public interface IServiceClientMemoryCache
    {
        void ClearCache();
        Task<T> GetCacheItemAsync<T>(string key) where T : class;
        Task WriteCacheItemAsync(ServiceClientMemoryCacheItem args);
    }
}
