// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SolutionTemplateCard } from '../../common/models/SolutionTemplateCard';
import { UserCatalogItems } from '../../common/models/UserCatalogItems';

export interface IHeaderProps {
    // Card data
    cardData: SolutionTemplateCard;
    userCatalogItemsData?: UserCatalogItems[] | undefined;
}
