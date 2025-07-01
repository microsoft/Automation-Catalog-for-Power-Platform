// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

param entityPrincipalId string
param storageAccounts_apdstorageprod_name string

var storageBlobDataContributorRole = subscriptionResourceId('Microsoft.Authorization/roleDefinitions', 'ba92f5b4-2d11-453d-a403-e96b0029c9fe')

resource storageAccounts_apdstorageprod_name_resource 'Microsoft.Storage/storageAccounts@2023-05-01' existing = {
  name: storageAccounts_apdstorageprod_name  // The scope is inherited from the module call in template.bicep
}

resource roleAssignmentStorageAccount 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = {
  name: guid(storageAccounts_apdstorageprod_name_resource.id, entityPrincipalId, storageBlobDataContributorRole, uniqueString(storageAccounts_apdstorageprod_name))
  properties: {
    roleDefinitionId: storageBlobDataContributorRole
    principalId: entityPrincipalId
  }
}

