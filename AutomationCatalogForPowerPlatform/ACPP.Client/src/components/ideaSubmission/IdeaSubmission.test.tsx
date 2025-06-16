// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import IdeaSubmission from './IdeaSubmission';

jest.mock('../../hooks/useScreenSize', () => ({
  useScreenSize: () => [1024],
}));

jest.mock('../../common/services/utpTelemetryService', () => ({
  utpTrackEvent: jest.fn(),
}));

// Mock useGetCategoriesData and useScreenSize hooks
jest.mock('../../hooks/useGetCategoriesData', () => ({
  useGetCategoriesData: () => ({
    data: [{ categoryTitle: 'Category 1' }, { categoryTitle: 'Category 2' }, { categoryTitle: 'Category 3' }],
    isLoading: false,
  }),
}));

describe('IdeaSubmission Component', () => {
  it('renders without errors', () => {
    renderWithProviders(<IdeaSubmission />);
    const submitIdea = screen.getByText('Share your ideas to help us build more automations!');
    expect(submitIdea).toBeInTheDocument();
  });

  it('renders the component with submit button', () => {
    renderWithProviders(<IdeaSubmission />);
    const submitButton = screen.getByTestId('submitIdea');
    expect(submitButton).toBeInTheDocument();
  });

  it('toggles inAppFeedback dialog when button is clicked', () => {
    renderWithProviders(<IdeaSubmission />);
    const submitButton = screen.getByTestId('submitIdea');
    fireEvent.click(submitButton);
    const inAppFeedbackDialog = screen.getByTestId('inAppFeedbackDialog');
    expect(inAppFeedbackDialog).toBeInTheDocument();
  });
});

