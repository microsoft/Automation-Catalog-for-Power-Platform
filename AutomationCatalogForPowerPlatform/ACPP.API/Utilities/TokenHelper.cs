using System.Security.Claims;
using System.Security.Principal;

namespace ACPP.API.Utilities
{
    public class TokenHelper
    {
        //const string _OIDclaimType = "http://schemas.microsoft.com/identity/claims/objectidentifier";
        //const string _UPNclaimType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn";
        const string _OIDclaimType = "oid";
        const string _UPNclaimType = "upn";

        public static string GetClaim(IIdentity identity, string claimType)
        {
            var claimsIdentity = GetClaimsIdentity(identity);
            var claim = claimsIdentity.Claims.FirstOrDefault(c => c.Type == claimType);
            return claim?.Value;
        }

        public static string GetUserId(IIdentity identity)
        {
            var claimsIdentity = GetClaimsIdentity(identity);
            var claim = claimsIdentity.Claims.FirstOrDefault(c => c.Type == _OIDclaimType);
            return claim?.Value;
        }

        public static string GetUPN(IIdentity identity)
        {
            var claimsIdentity = GetClaimsIdentity(identity);
            var claim = claimsIdentity.Claims.FirstOrDefault(c => c.Type == _UPNclaimType);
            return claim?.Value;
        }

        private static ClaimsIdentity GetClaimsIdentity(IIdentity identity)
        {
            return identity as ClaimsIdentity;
        }
    }
}
