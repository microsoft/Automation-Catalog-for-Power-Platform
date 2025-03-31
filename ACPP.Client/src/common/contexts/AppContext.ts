import { createContext } from 'react';

export const AppContext = createContext<{
    appEnv?: string;
}>({
    appEnv: undefined,
});
