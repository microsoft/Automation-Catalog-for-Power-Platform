// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useQuery } from 'react-query';
import { useAuth } from "../hooks/useAuthenticatedClient";
import config from '../config';
import { apiRoutes } from '../apiRoutes';
import { UserCatalogItems } from '../common/models/UserCatalogItems';

export const useGetUserCatalogItems = (appEnv: string) => {
    const [httpClient] = useAuth(config.apiEndpoint!, config.defaultTokenScope!);
    return useQuery(
        ['user-catalogitems-data', 'get'],
        async () => {
            const response = await httpClient.get(`${apiRoutes.getUserCatalogItems}?env=${appEnv ?? 'prod'}`);
            const userCatalogItemsData: UserCatalogItems[] = response?.data;;
            return userCatalogItemsData;
        },
        { refetchOnWindowFocus: false, retry: false, staleTime: Infinity, cacheTime: Infinity },
    );
};

