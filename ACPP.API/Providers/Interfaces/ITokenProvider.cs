namespace ACPP.API.Providers.Interfaces
{
    public interface ITokenProvider
    {
        Task<string> GetOBOTokenForUser(string userToken, string[] scopes);

    }
}