// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useMutation } from 'react-query';
import { useAuth } from "./useAuthenticatedClient";
import config from '../config';
import { apiRoutes } from '../apiRoutes';

export const useUpdateLastVisitTime = () => {
    const [httpClient] = useAuth(config.apiEndpoint!, config.defaultTokenScope!);
    return useMutation(
        ['user-last-visit', 'patch'],
        async () => {
            const response = await httpClient.patch(apiRoutes.updateLastVisitTime);
            if (response.status === 200) {
                return response.data;
            }
            return false;
        },
        { retry: false },
    );
};

