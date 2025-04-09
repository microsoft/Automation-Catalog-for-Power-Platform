import { createContext } from 'react';
import { UserDetails } from '../models/UserDetails';
import { UserCatalogItems } from '../models/UserCatalogItems';

export const UserContext = createContext<{
    userBasicData?: UserDetails;
    userCatalogItems?: UserCatalogItems[];
}>({
    userBasicData: undefined,
    userCatalogItems: undefined,
});
