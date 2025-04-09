import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import AboutPage from './AboutPage';
import config from '../../config';

describe('AboutPage Component', () => {
  it('renders the component without errors', () => {
    renderWithProviders(<AboutPage />);
    expect(screen.getByTestId('about-page')).toBeInTheDocument();
  });

  it('displays the about header text', () => {
    renderWithProviders(<AboutPage />);
    const aboutHeader = screen.getByTestId('about-header');
    expect(aboutHeader).toBeInTheDocument();
  });

  it('displays the about content text', () => {
    renderWithProviders(<AboutPage />);
    const aboutContent = screen.getByTestId('about-content');
    expect(aboutContent).toBeInTheDocument();
  });

  it('displays the links with the correct text and href', () => {
    renderWithProviders(<AboutPage />);
    const links = [
      { href: config.privacyPolicyLink, text: 'Privacy Policy' },
      { href: config.termsOfUseLink, text: 'Terms of Use' },
    ];

    links.forEach((link) => {
      const linkElement = screen.getByText(link.text);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', link.href);
      expect(linkElement).toHaveAttribute('target', '_blank');
    });
  });

  it('displays dividers between links', () => {
    renderWithProviders(<AboutPage />);
    const dividers = screen.getAllByTestId('divider');
    expect(dividers.length).toBe(2);
  });
});
