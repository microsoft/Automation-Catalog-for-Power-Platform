import { useMutation } from 'react-query';
import { useAuth } from "./useAuthenticatedClient";
import config from '../config';
import { apiRoutes } from '../apiRoutes';

export const useUpdateEmailsSubscription = () => {
    const [httpClient] = useAuth(config.apiEndpoint!, config.defaultTokenScope!);
    return useMutation(
        ['user-emails-subscription', 'patch'],
        async (switchValue: boolean) => {
            const routeWithParams = `${apiRoutes.updateEmailsSubscription}?newValue=${switchValue.toString()}`;
            await httpClient.patch(routeWithParams);
            return true;
        },
        { retry: false },
    );
};
