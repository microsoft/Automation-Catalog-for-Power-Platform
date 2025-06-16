// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useQuery } from 'react-query';
import { useAuth } from './useAuthenticatedClient';
import config from '../config';
import { AnnouncementBannerData } from '../common/models/AnnouncementBanner';
import { apiRoutes } from '../apiRoutes';

export const useGetAnnouncementBannerData = (appEnv: string) => {
    const [httpClient] = useAuth(config.apiEndpoint!, config.defaultTokenScope!);
    return useQuery(
        ['announcement', 'get'],
        async () => {
            const apiRoute = `${apiRoutes.getAnnouncements}?env=${appEnv ?? 'prod'}`;
            const response = await httpClient.get(apiRoute);
            const announcementData: AnnouncementBannerData = response?.data;
            return announcementData;
        },
        { refetchOnWindowFocus: false, retry: false, staleTime: Infinity, cacheTime: Infinity }
    );
};

