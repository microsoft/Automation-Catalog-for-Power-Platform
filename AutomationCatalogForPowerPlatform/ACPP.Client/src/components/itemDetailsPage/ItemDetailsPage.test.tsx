// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { screen, fireEvent, within } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import { ItemDetailsPage } from "./ItemDetailsPage";
import { mockSearchCards } from '../../mockData/mockSearchCards';


jest.mock('../../hooks/useGetAllCards', () => ({
    useGetAllCards: () => ({ isError: false, isLoading: false, data: mockSearchCards }),
}));

jest.mock('../../hooks/useUpdateCardClickCount', () => ({
    useUpdateClickCount: () => ({ mutate: jest.fn() }),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        state: { cardUniqueName: "Test Automation" },
    }),
}));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))

describe('ItemDetailsPage Component', () => {
    it('renders the component without errors', () => {
        renderWithProviders(<ItemDetailsPage />);
        expect(screen.getByTestId('item-detailsPage')).toBeInTheDocument();
    });

    it('displays the title and subtitle', () => {
        renderWithProviders(<ItemDetailsPage />);
        const title = screen.getByTestId('item-title');
        const subtitle = screen.getByTestId('item-category');
        expect(title).toBeInTheDocument();
        expect(subtitle).toBeInTheDocument();
    });

    it('displays the number of installations, time savings, time savings frequency', () => {
        renderWithProviders(<ItemDetailsPage />);
        const noOfInstallations = screen.getByTestId('item-noOfInstallations');
        const timeSavings = screen.getByTestId('item-timeSavings');
        const timeSavingsFrequency = screen.getByTestId('item-timeSavingsFrequency');
        expect(noOfInstallations).toBeInTheDocument();
        expect(timeSavings).toBeInTheDocument();
        expect(timeSavingsFrequency).toBeInTheDocument();
    });

    it('displays the ShareToTeams button', () => {
        renderWithProviders(<ItemDetailsPage />);
        const shareToTeams = screen.getByTestId('item-shareToTeams');
        expect(shareToTeams).toBeInTheDocument();
    });

    it('displays the back button', () => {
        renderWithProviders(<ItemDetailsPage />);
        const backButton = screen.getByTestId('item-backButton');
        expect(backButton).toBeInTheDocument();
    });

    it('displays the create button', () => {
        renderWithProviders(<ItemDetailsPage />);
        const createButton = screen.getByTestId('item-createButton');
        expect(createButton).toBeInTheDocument();
    });

    it('navigates to the home page when the back button is clicked', () => {
        renderWithProviders(<ItemDetailsPage />);
        const backButton = screen.getByTestId('item-backButton');
        fireEvent.click(backButton);
        expect(window.location.pathname).toBe('/');
    });

    it('opens share in teams pop up when the share to teams drop down is clicked', () => {
        renderWithProviders(<ItemDetailsPage />);
        const shareToTeams = screen.getByTestId('item-shareToTeams');
        fireEvent.click(shareToTeams);
        const copyLinkButton = within(screen.getByTestId('share-menuItem'));
        expect(copyLinkButton.getByTestId('share-copyLinkButton')).toBeInTheDocument();
        const shareInTeamsButton = within(screen.getByTestId('share-shareInTeamsButton'));
        expect(shareInTeamsButton.getByTestId('share-shareInTeamsButton')).toBeInTheDocument();
    });
});
