interface mspcat_CatalogItem {
    solutionTemplateUniqueId: string;
    solutionTemplateVersionId: string;
    solutionName: string;
    timeSavingValue: string | null;
    timeSavingType: string | null;
    timeSavingUnit: string | null;
}

export interface UserCatalogItems {
    mspcat_CatalogItem: mspcat_CatalogItem;
    solutionTemplateUniqueId: string;
    installedOn: string;
    mspcat_TemplateSuffixId: string;
    solutionPackageName: string;
    mspcat_EnvironmentUrl: string;
    solutionId: string;
    objectId: string;
    environmentId: string;
    flowRuns: number;
    flowUrl: string;
    noOfDaysWithAtleastOneSuccessfulRun: number;
    noOfWeeksWithAtleastOneSuccessfulRun: number;
}