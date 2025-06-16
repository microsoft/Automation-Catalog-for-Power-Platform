# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

# Set the environment URL
$envUrl = Read-Host "Enter value for Org URL"

# Get all subdirectories in the current directory
$folders = Get-ChildItem -Directory

foreach ($folder in $folders) {
    $folderName = $folder.Name
    $zipPath = Join-Path $folder.FullName "$folderName.zip"
    $docPath = Join-Path $folder.FullName "SubmissionDoc.json"
    Write-Host "Submitting package for $folderName..."
    pac catalog submit -env $envUrl -p "$($folder.FullName)\SubmissionDoc.json" -pz "$($folder.FullName)\$folderName.zip"

}
