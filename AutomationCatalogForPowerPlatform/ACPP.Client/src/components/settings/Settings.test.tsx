import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UserContext } from '../../common/contexts/UserContext';
import Settings from './Settings';

jest.mock('../../hooks/useUpdateEmailsSubscription', () => ({
    useUpdateEmailsSubscription: () => ({ mutate: jest.fn(), isSuccess: false, isError: false, isLoading: false }),
}));

jest.mock('../../hooks/useUpdateTeamsNotificationsSubscription', () => ({
    useUpdateTeamsNotificationsSubscription: () => ({ mutate: jest.fn(), isSuccess: false, isError: false, isLoading: false }),
}));

jest.mock('../../hooks/useUpdatePersonalDevEnvId', () => ({
    useUpdatePersonalDevEnvId: () => ({ mutate: jest.fn(), isError: false, isLoading: false, isSuccess: false }),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        state: {},
    }),
}));

describe('Settings component', () => {
    test('renders without crashing', () => {
        render(
            <UserContext.Provider value={{ userBasicData: { personalDevEnvId: '52d16bb7-0058-4c74-a971-f050c6a8e724', emailsSubscribed: false, teamsNotificationsSubscribed: false } }}>
                <Settings />
            </UserContext.Provider>
        );
        expect(screen.getByText("Settings")).toBeInTheDocument();
        expect(screen.getByText("Email Notifications")).toBeInTheDocument();
        expect(screen.getByTestId("emailNotificationsSwitch")).toBeInTheDocument();
        expect(screen.getByText("Teams Push Notifications")).toBeInTheDocument();
        expect(screen.getByTestId("teamsPushNotificationsSwitch")).toBeInTheDocument();
        expect(screen.getByText("Preferred Personal Environment ID")).toBeInTheDocument();
        expect(screen.getByTestId("environmentId")).toBeInTheDocument();

    });

    //write a test to check the switches calling the mutate function
    test('should call the mutate function when the switches are toggled', () => {
        const { mutate: updateEmailsSubscription } = require('../../hooks/useUpdateEmailsSubscription');
        const { mutate: updateTeamsPushNotificationsSubscription } = require('../../hooks/useUpdateTeamsNotificationsSubscription');
        render(
            <UserContext.Provider value={{ userBasicData: { personalDevEnvId: '52d16bb7-0058-4c74-a971-f050c6a8e724', emailsSubscribed: false, teamsNotificationsSubscribed: false } }}>
                <Settings />
            </UserContext.Provider>
        );
        const emailNotificationsSwitch = screen.getByTestId('emailNotificationsSwitch');
        const teamsPushNotificationsSwitch = screen.getByTestId('teamsPushNotificationsSwitch');
        emailNotificationsSwitch.click();
        teamsPushNotificationsSwitch.click();
        expect(updateEmailsSubscription).toHaveBeenCalled();
        expect(updateTeamsPushNotificationsSubscription).toHaveBeenCalled();
    });

    //write a test to check the input field calling the mutate function
    test('should call the mutate function when the input field is changed', () => {
        const { mutate: updatePersonalDevEnvId } = require('../../hooks/useUpdatePersonalDevEnvId');
        render(
            <UserContext.Provider value={{ userBasicData: { personalDevEnvId: '52d16bb7-0058-4c74-a971-f050c6a8e724', emailsSubscribed: false, teamsNotificationsSubscribed: false } }}>
                <Settings />
            </UserContext.Provider>
        );
        const environmentId = screen.getByTestId('environmentId');
        environmentId.focus();
        environmentId.blur();
        expect(updatePersonalDevEnvId).toHaveBeenCalled();
    });

});