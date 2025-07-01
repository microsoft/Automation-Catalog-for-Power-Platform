// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useMutation } from 'react-query';
import { useAuth } from "./useAuthenticatedClient";
import config from '../config';
import { apiRoutes } from '../apiRoutes';

export const useUpdatePersonalDevEnvId = () => {
    const [httpClient] = useAuth(config.apiEndpoint!, config.defaultTokenScope!);
    return useMutation(
        ['user-personal-dev-env-id', 'patch'],
        async (environmentId: string) => {
            const routeWithParams = `${apiRoutes.updatePersonalDevEnvId}?newValue=${environmentId}`;
            await httpClient.patch(routeWithParams);
            return true;
        },
        { retry: false },
    );
};

