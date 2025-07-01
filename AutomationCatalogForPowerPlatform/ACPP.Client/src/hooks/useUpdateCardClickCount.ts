// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useMutation } from 'react-query';
import { useAuth } from "./useAuthenticatedClient";
import config from '../config';
import { apiRoutes } from '../apiRoutes';

export const useUpdateClickCount = () => {
    const [httpClient] = useAuth(config.apiEndpoint!, config.defaultTokenScope!);
    return useMutation(
        ['user-card-click-count', 'post'],
        async (cardUniqueName: string) => {
            const routeWithParams = `${apiRoutes.updateClickCount}?cardUniqueName=${cardUniqueName}`;
            await httpClient.post(routeWithParams);
            return true;
        },
        { retry: false },
    );
};

