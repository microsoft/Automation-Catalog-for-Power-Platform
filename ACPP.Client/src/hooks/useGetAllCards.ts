import { useQuery } from 'react-query';
import { useAuth } from './useAuthenticatedClient';
import config from '../config';
import { apiRoutes } from '../apiRoutes';
import { SolutionTemplateCard } from '../common/models/SolutionTemplateCard';
import { CardCategoryMapping } from '../common/helpers/Constants';

export const useGetAllCards = (appEnv: string) => {
    const [httpClient] = useAuth(config.apiEndpoint!, config.defaultTokenScope!);
    return useQuery(
        ['all-cards', 'get'],
        async () => {
            const apiRoute = `${apiRoutes.getAllCards}?env=${appEnv ?? 'prod'}`;
            const response = await httpClient.get(apiRoute);
            const cards: SolutionTemplateCard[] = response?.data;
            cards.forEach((card) => {
                card.cardCategory = CardCategoryMapping[card.cardCategory] || card.cardCategory;
            });
            return cards;
        },
        { refetchOnWindowFocus: false, retry: false, staleTime: Infinity, cacheTime: Infinity },
    );
};
