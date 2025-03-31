import { BearerTokenAuthProvider, TeamsUserCredential, createApiClient } from '@microsoft/teamsfx';
import { TeamsFxContext } from '../common/contexts/TeamsFxContext';
import { useContext, useMemo } from 'react';
import { authentication } from '@microsoft/teams-js';


const getAccessToken = async (teamsUserCredential?: TeamsUserCredential, scope: string = "") => {
    const token = await authentication.getAuthToken();
    
    if (token === undefined) {
        throw new Error('Failed to get initial token');
    }
    return token;
    // if (!teamsUserCredential) {
    //     throw new Error("TeamsUserCredential is undefined");
    // } else {
    //     try {
    //         let token = await teamsUserCredential?.getToken(scope).then((token) => token!.token);
    //         if (!token) {
    //             await teamsUserCredential.login(scope);
    //             token = await teamsUserCredential?.getToken(scope).then((token) => token!.token);
    //         }
    //         return token;
    //     }
    //     catch (err) {
    //         await teamsUserCredential.login(scope);
    //         let token = await teamsUserCredential?.getToken(scope).then((token) => token!.token);
    //         return token;
    //     }
    // }
};

export const useAuth = (baseUrl: string, scope?: string) => {
    const { teamsUserCredential } = useContext(TeamsFxContext);
    const httpClient = useMemo(() => {
        const httpClient = createApiClient(
            baseUrl,
            new BearerTokenAuthProvider(async () => await getAccessToken(teamsUserCredential, scope))
        );
        return httpClient;
    }, [baseUrl, scope]);
    return [httpClient];
}
