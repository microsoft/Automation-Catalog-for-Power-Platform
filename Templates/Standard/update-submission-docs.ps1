# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

# Prompt user for input values
$publisherId = Read-Host "Enter value for PublisherId"
$publisherDisplayName = Read-Host "Enter value for PublisherDisplayName"

$firstNameEngineering = Read-Host "Enter value for Engineering First Name"
$lastNameEngineering = Read-Host "Enter value for Engineering Last Name"
$engineeringEmail = Read-Host "Enter value for Engineering Email"
$engineeringPhoneNumber = Read-Host "Enter value for Engineering Phone Number"

$firstNameSupport = Read-Host "Enter value for Support First Name"
$lastNameSupport = Read-Host "Enter value for Support Last Name"
$supportEmail = Read-Host "Enter value for Support Email"
$supportPhoneNumber = Read-Host "Enter value for Support Phone Number"

# Get all JSON files in subdirectories
$jsonFiles = Get-ChildItem -Path . -Recurse -Filter *.json

foreach ($file in $jsonFiles) {
	try {
		# Read and parse JSON content
		$jsonContent = Get-Content $file.FullName -Raw | ConvertFrom-Json

		# Update properties
		$jsonContent.publisherDetails.publisherId = $publisherId
		$jsonContent.publisherDetails.publisherDisplayName = $publisherDisplayName

		$jsonContent.catalogItemDefinition.offer.engineeringName.firstName = $firstNameEngineering
		$jsonContent.catalogItemDefinition.offer.engineeringName.lastName = $lastNameEngineering
		$jsonContent.catalogItemDefinition.offer.engineeringName.email = $engineeringEmail
		$jsonContent.catalogItemDefinition.offer.engineeringName.phoneNumber = $engineeringPhoneNumber

		$jsonContent.catalogItemDefinition.offer.supportName.firstName = $firstNameSupport
		$jsonContent.catalogItemDefinition.offer.supportName.lastName = $lastNameSupport
		$jsonContent.catalogItemDefinition.offer.supportName.email = $supportEmail
		$jsonContent.catalogItemDefinition.offer.supportName.phoneNumber = $supportPhoneNumber

		# Convert back to JSON and save
		$jsonContent | ConvertTo-Json -Depth 10 | Set-Content -Path $file.FullName

		Write-Host "Updated: $($file.FullName)"
	} catch {
		Write-Warning "Failed to update $($file.FullName): $_"
	}
}