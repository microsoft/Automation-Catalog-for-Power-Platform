// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createContext } from 'react';

export const AppContext = createContext<{
    appEnv?: string;
}>({
    appEnv: undefined,
});

