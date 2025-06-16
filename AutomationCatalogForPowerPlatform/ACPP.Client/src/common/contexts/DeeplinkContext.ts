// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createContext } from 'react';

export const DeepLinkContext = createContext<{
    cardUniqueName?: string
    source?: string;
    campaignId?: string;
    targetComponentId?: string;
    clearContext?: (data: any) => void;
}>({
    cardUniqueName: undefined,
    source: undefined,
    campaignId: undefined,
    targetComponentId: undefined,
    clearContext: (data: any) => { },
});

