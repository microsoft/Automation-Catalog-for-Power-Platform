// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using ACPP.API.Extensions;

namespace ACPP.API.Filters
{
    public class HttpResponseExceptionFilter : IActionFilter, IOrderedFilter
    {
        public int Order => int.MaxValue - 10;

        public void OnActionExecuting(ActionExecutingContext context) { }

        public void OnActionExecuted(ActionExecutedContext context)
        {

            if (context.Result != null)
            {
                ObjectResult objectResult = (ObjectResult)context.Result;
                if (objectResult.Value != null)
                {
                    context.Result = new OkObjectResult(null)
                    {
                        StatusCode = (int)HttpStatusCode.OK,
                        Value = objectResult.CreateDataResponse()
                    };
                }
                else
                {
                    context.Result = new OkObjectResult(null)
                    {
                        StatusCode = (int)HttpStatusCode.OK,
                        Value = objectResult.CreateEmptyResponse()
                    };
                }
            }
            if (context.Exception != null)
            {
                context.Result = new ObjectResult(null)
                {
                    StatusCode = (int)HttpStatusCode.InternalServerError,
                    Value = context.Exception.CreateErrorResponse()
                };

                context.ExceptionHandled = true;
            }

        }
    }
}

