// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { fireEvent, screen, within } from '@testing-library/react';

import { renderWithProviders } from '../../test/test-utils';
import { ShareToTeamsMenu } from './ShareToTeams';

describe('ShareToTeams', () => {
    it('renders all the elements', () => {
        renderWithProviders(<ShareToTeamsMenu setShareButtonText={false} cardUniqueName="https://localhost:53000/index.html#/tab?env=dev" message="Default message in compose box" preview={true} />);
        fireEvent.click(screen.getByTestId('shareToTeamButton'));
        const shareToTeamMenu = within(screen.getByTestId('shareToTeamMenu'));
        expect(shareToTeamMenu.getByText('Copy link')).toBeInTheDocument();
        expect(shareToTeamMenu.getByText('Share in Teams')).toBeInTheDocument();
    });
});
