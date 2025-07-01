// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useMutation } from 'react-query';
import { useAuth } from "./useAuthenticatedClient";
import config from '../config';
import { apiRoutes } from '../apiRoutes';

export const useUpdateTeamsNotificationsSubscription = () => {
    const [httpClient] = useAuth(config.apiEndpoint!, config.defaultTokenScope!);
    return useMutation(
        ['user-teams-notifications-subscription', 'patch'],
        async (switchValue: boolean) => {
            const routeWithParams = `${apiRoutes.updateTeamsNotificationsSubscription}?newValue=${switchValue}`;
            await httpClient.patch(routeWithParams);
            return true;
        },
        { retry: false },
    );
};

