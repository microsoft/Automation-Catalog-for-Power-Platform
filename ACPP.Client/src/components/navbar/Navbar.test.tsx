import { screen, fireEvent, within } from '@testing-library/react';
import Navbar from './Navbar';
import { renderWithProviders } from '../../test/test-utils';
import config from '../../config';

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

describe('Navbar', () => {
  it('renders all the elements', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText(config.appTitle)).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Manage')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByTestId('detectDuplicateFlowsIcon')).toBeInTheDocument();
    expect(screen.getByTestId('settingssIcon')).toBeInTheDocument();
    expect(screen.getByTestId('feedbackIcon')).toBeInTheDocument();
    expect(screen.getByTestId('helpIcon')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('moreIcon'));
    const moreMenu = within(screen.getByTestId('moreMenu'));
    expect(moreMenu.getByText('Learn more')).toBeInTheDocument();
  });

  it('navigates to the home page when the home link is clicked', () => {
    renderWithProviders(<Navbar />);
    const homeLink = screen.getByText('Home');
    fireEvent.click(homeLink);
    expect(window.location.pathname).toBe('/');
  });

  it('navigates to the manage page when the manage link is clicked', () => {
    renderWithProviders(<Navbar />);
    const manageLink = screen.getByText('Manage');
    fireEvent.click(manageLink);
    expect(window.location.pathname).toBe('/Manage');
  });

  it('navigates to the about page when the about link is clicked', () => {
    renderWithProviders(<Navbar />);
    const aboutLink = screen.getByText('About');
    fireEvent.click(aboutLink);
    expect(window.location.pathname).toBe('/About');
  });

  it('navigates to the settings page when the link is clicked', () => {
    renderWithProviders(<Navbar />);
    const settingsLink = screen.getByTestId('settingsIcon');
    fireEvent.click(settingsLink);
    expect(window.location.pathname).toBe('/Settings');
  });
});
