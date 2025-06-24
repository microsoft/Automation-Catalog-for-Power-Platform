// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using ACPP.API.Cache;
using ACPP.API.Configuration;
using ACPP.API.Managers.Implementations;
using ACPP.API.Managers.Interfaces;
using ACPP.API.Providers.Implementations;
using ACPP.API.Providers.Interfaces;
using ACPP.API.Services.Implementations;
using ACPP.API.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Identity.Web;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddMicrosoftIdentityWebApi(builder.Configuration); 

builder.Services.AddAuthorization();

builder.Services.AddApplicationInsightsTelemetry(builder.Configuration);

builder.Services.Configure<AzureADConfiguration>(builder.Configuration.GetSection(AzureADConfiguration.SectionName));
builder.Services.Configure<AzureStorageConfiguration>(builder.Configuration.GetSection(AzureStorageConfiguration.SectionName));
builder.Services.Configure<DataverseConfiguration>(builder.Configuration.GetSection(DataverseConfiguration.SectionName));
builder.Services.Configure<GraphConfiguration>(builder.Configuration.GetSection(GraphConfiguration.SectionName));

builder.Services.AddMemoryCache();
builder.Services.AddSingleton<IServiceClientMemoryCache, ServiceClientMemoryCache>();
builder.Services.AddSingleton<ITableStorageProvider, TableStorageProvider>();
builder.Services.AddSingleton<IGraphService, GraphService>();
builder.Services.AddSingleton<IUserManager, UserManager>();
builder.Services.AddSingleton<ICardsDataManager, CardsDataManager>();
builder.Services.AddSingleton<IAnnouncementManager, AnnouncementManager>();
builder.Services.AddSingleton<ITokenProvider,  TokenProvider>();
builder.Services.AddSingleton<ICatalogDataManager, CatalogDataManager>();

builder.Services.AddHttpClient();
builder.Services.AddHttpContextAccessor();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

builder.Services.AddCors(o => o.AddPolicy("AHDevPolicy", builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
}));

var app = builder.Build();


// Configure the HTTP request pipeline.

app.UseSwagger();

#if DEBUG
if (app.Environment.IsDevelopment())
{
    app.UseCors("AHDevPolicy");
    string spaProxyServer = builder.Configuration.GetValue<string>("Initialization:ReactUrl");
    app.MapWhen(x => !x.Request.Path.Value.Contains("/api/") && !x.Request.Path.Value.Contains("/swagger/"), builder =>
    {
        builder.UseSpa(spa =>
        {
            spa.Options.DefaultPage = "/index.html";
            spa.UseProxyToSpaDevelopmentServer(spaProxyServer);
        });
    });

    app.UseSwaggerUI();
}
#endif


app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers().RequireAuthorization();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath, "ClientApp")),
    RequestPath = "/StaticContent/hometab",
    ServeUnknownFileTypes = true,
    OnPrepareResponse = (context) =>
    {
        var headers = context.Context.Response.GetTypedHeaders();
        headers.CacheControl = new Microsoft.Net.Http.Headers.CacheControlHeaderValue
        {
            NoCache = true
        };
    }
});

app.Run();

