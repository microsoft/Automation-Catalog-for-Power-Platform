// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useQuery } from 'react-query';
import { useAuth } from "./useAuthenticatedClient";
import config from '../config';
import { UserDetails } from '../common/models/UserDetails';
import { apiRoutes } from '../apiRoutes';

export const useGetUserBasicData = (setUserDetails) => {
    const [httpClient] = useAuth(config.apiEndpoint!, config.defaultTokenScope!);
    return useQuery(
        ['user-details', 'get'],
        async () => {
            const response = await httpClient.get(apiRoutes.getUserDetails);
            const userData: UserDetails = response?.data;
            //update the user context with the user data, so that it can be accessed globally
            setUserDetails(userData);
            return userData;
        },
        { refetchOnWindowFocus: false, retry: false },
    );
};

