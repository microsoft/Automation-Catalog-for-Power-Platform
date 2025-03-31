import { createContext } from 'react';
import { UserDetails } from '../models/UserDetails';

export const UserContext = createContext<{
    userBasicData?: UserDetails;
}>({
    userBasicData: undefined
});
