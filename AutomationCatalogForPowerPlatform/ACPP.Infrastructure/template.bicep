// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

@description('App service name')
param appService string

@description('App service plan name')
param appServicePlan string

@description('Storage account name')
param storageAccount string

@description('Application Insights name')
param applicationInsights string

@description('Client ID of the application')
param clientId string

@description('Tenant ID of the application')
param tenantId string

@description('Catalog Publisher Id')
param catalogPublisherId string

@description('Catalog Environment URL')
param catalogEnvUrl string

param storageAccounts_apdstorageprod_name string = storageAccount
resource appServicePlan_resource 'Microsoft.Web/serverfarms@2023-12-01' = {
  name: appServicePlan
  location: resourceGroup().location
  tags: {
    ' env': 'prod'
  }
  sku: {
    name: 'B1'
    tier: 'Basic'
    size: 'B1'
    family: 'B'
    capacity: 1
  }
  kind: 'app'
  properties: {
    perSiteScaling: false
    elasticScaleEnabled: false
    maximumElasticWorkerCount: 1
    isSpot: false
    reserved: false
    isXenon: false
    hyperV: false
    targetWorkerCount: 0
    targetWorkerSizeId: 0
    zoneRedundant: false
  }
}

resource appService_resource 'Microsoft.Web/sites@2023-12-01' = {
  name: appService
  location: resourceGroup().location
  tags: {
    ' env': 'prod'
  }
  kind: 'app'
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    enabled: true
    serverFarmId: appServicePlan_resource.id
    keyVaultReferenceIdentity: 'SystemAssigned'
  }
}

resource storageAccounts_apdstorageprod_name_resource 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: storageAccounts_apdstorageprod_name
  location: resourceGroup().location
  tags: {
    Env: 'Production'
  }
  sku: {
    name: 'Standard_LRS'
    tier: 'Standard'
  }
  kind: 'StorageV2'
  properties: {
    defaultToOAuthAuthentication: false
    allowCrossTenantReplication: true
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: false
    allowSharedKeyAccess: false
    networkAcls: {
      bypass: 'AzureServices'
      virtualNetworkRules: []
      ipRules: []
      defaultAction: 'Allow'
    }
    supportsHttpsTrafficOnly: true
    encryption: {
      services: {
        file: {
          keyType: 'Account'
          enabled: true
        }
        blob: {
          keyType: 'Account'
          enabled: true
        }
      }
      keySource: 'Microsoft.Storage'
    }
    accessTier: 'Hot'
  }
}

resource storageAccounts_apdstorageprod_name_default 'Microsoft.Storage/storageAccounts/blobServices@2023-05-01' = {
  parent: storageAccounts_apdstorageprod_name_resource
  name: 'default'
  sku: {
    name: 'Standard_LRS'
    tier: 'Standard'
  }
  properties: {
    changeFeed: {
      retentionInDays: 7
      enabled: true
    }
    restorePolicy: {
      enabled: false
    }
    containerDeleteRetentionPolicy: {
      enabled: false
    }
    cors: {
      corsRules: []
    }
    deleteRetentionPolicy: {
      allowPermanentDelete: false
      enabled: false
    }
    isVersioningEnabled: true
  }
}

resource Microsoft_Storage_storageAccounts_fileServices_storageAccounts_apdstorageprod_name_default 'Microsoft.Storage/storageAccounts/fileServices@2023-05-01' = {
  parent: storageAccounts_apdstorageprod_name_resource
  name: 'default'
  sku: {
    name: 'Standard_LRS'
    tier: 'Standard'
  }
  properties: {
    protocolSettings: {
      smb: {}
    }
    cors: {
      corsRules: []
    }
    shareDeleteRetentionPolicy: {
      enabled: true
      days: 7
    }
  }
}

resource Microsoft_Storage_storageAccounts_queueServices_storageAccounts_apdstorageprod_name_default 'Microsoft.Storage/storageAccounts/queueServices@2023-05-01' = {
  parent: storageAccounts_apdstorageprod_name_resource
  name: 'default'
  properties: {
    cors: {
      corsRules: []
    }
  }
}

resource Microsoft_Storage_storageAccounts_tableServices_storageAccounts_apdstorageprod_name_default 'Microsoft.Storage/storageAccounts/tableServices@2023-05-01' = {
  parent: storageAccounts_apdstorageprod_name_resource
  name: 'default'
  properties: {
    cors: {
      corsRules: []
    }
  }
}

resource storageAccounts_apdstorageprod_name_default_Users 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-05-01' = {
  parent: Microsoft_Storage_storageAccounts_tableServices_storageAccounts_apdstorageprod_name_default
  name: 'Users'
  properties: {}
  dependsOn: [
    storageAccounts_apdstorageprod_name_resource
  ]
}

resource applicationInsights_resource 'microsoft.insights/components@2020-02-02' = {
  name: applicationInsights
  location: resourceGroup().location
  tags: {
    Env: 'Production'
  }
  kind: 'web'
  properties: {
    Application_Type: 'web'
    RetentionInDays: 90
    //WorkspaceResourceId: workspaces_utp_csetelemetry_coldstorage_externalid
    IngestionMode: 'ApplicationInsights'
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}

var appSettings = {
  APPINSIGHTS_INSTRUMENTATIONKEY: applicationInsights_resource.properties.InstrumentationKey
  'AzureAd__ClientId': clientId
  'AzureAd__TenantId' : tenantId
  'AzureAd__Instance': 'https://login.microsoftonline.com/'
  'AzureAd__Audience': 'api://${appService_resource.properties.defaultHostName}/${clientId}'
  'AzureStorage__StorageAccountUri': storageAccounts_apdstorageprod_name_resource.properties.primaryEndpoints.table
  'AzureStorage__UsersTableName': 'Users'
  'AzureStorage__AnnouncementsTableName': 'Announcements'
  'AzureStorage__CardsTableName': 'Cards'
  'Dataverse__CatalogEnvUrl': catalogEnvUrl
  'Dataverse__PublisherId': catalogPublisherId
  'AppService:Name': appService_resource.name
  'AppService:URL': appService_resource.properties.defaultHostName
  'AzureStorage__Name': storageAccounts_apdstorageprod_name
  StorageAccountName: storageAccounts_apdstorageprod_name
  AzureWebJobsStorage__accountName: storageAccounts_apdstorageprod_name
}

resource appServiceSettings 'Microsoft.Web/sites/config@2022-03-01' = {
  parent: appService_resource
  name: 'appsettings'
  kind: 'string'
  properties: appSettings
  dependsOn: [
    appServicePlan_resource
  ]
}

output appServiceUrl string = appService_resource.properties.defaultHostName
output storageAccountUrl string = storageAccounts_apdstorageprod_name_resource.properties.primaryEndpoints.table
output applicationInsightsInstrumentationKey string = applicationInsights_resource.properties.InstrumentationKey
output appServiceName string = appService_resource.name

