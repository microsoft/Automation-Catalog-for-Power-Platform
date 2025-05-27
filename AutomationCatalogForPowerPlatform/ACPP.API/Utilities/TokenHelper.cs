using System.Security.Claims;
using System.Security.Principal;

namespace ACPP.API.Utilities
{
    public class TokenHelper
    {
        const string _OIDclaimType = "oid";
        const string _OIDclaimType_1 = "http://schemas.microsoft.com/identity/claims/objectidentifier";
        

        public static string GetClaim(IIdentity identity, string claimType)
        {
            var claimsIdentity = GetClaimsIdentity(identity);
            var claim = claimsIdentity.Claims.FirstOrDefault(c => c.Type == claimType);
            if (claim == null)
            {
                claim = claimsIdentity.Claims.FirstOrDefault(c => c.Type == _OIDclaimType_1);
            }
            return claim?.Value;
        }

        public static string GetUserId(IIdentity identity)
        {
            var claimsIdentity = GetClaimsIdentity(identity);
            var claim = claimsIdentity.Claims.FirstOrDefault(c => c.Type == _OIDclaimType);
            return claim?.Value;
        }

        private static ClaimsIdentity GetClaimsIdentity(IIdentity identity)
        {
            return identity as ClaimsIdentity;
        }
    }
}
