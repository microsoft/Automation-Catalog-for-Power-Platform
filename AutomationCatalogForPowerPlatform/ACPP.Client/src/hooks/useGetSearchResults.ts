// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useMutation } from 'react-query';
import { useAuth } from "./useAuthenticatedClient";
import config from '../config';
import { apiRoutes } from '../apiRoutes';

export const useGetSearchResults = (searchText: string, selectedCategories: string[]) => {
    const [httpClient] = useAuth(config.apiEndpoint!, config.defaultTokenScope!);
    return useMutation(
        ['search-results', 'post'],
        async () => {
            const response = await httpClient.post(apiRoutes.searchCards,
                {
                    searchText,
                    selectedCategories
                });
            if (response.status === 200) {
                return response.data;
            }
            return false;
        },
        { retry: false },
    );
};

