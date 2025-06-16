// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SolutionTemplateCard } from '../../common/models/SolutionTemplateCard';

// Interface to define the properties for the VisualCard component
export interface IDisplayCardProps {
    // Data for the card to be displayed in the component
    cardData: SolutionTemplateCard;

    // Flag for image cards
    isImage: boolean;

    // optional property for additional styling
    className?: string;
}
