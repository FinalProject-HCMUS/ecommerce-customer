import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../Footer';
import shopData from '../../../locales/en/shopData.json';

// Mock i18n t function to just return the key for easier assertions
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

describe('Footer', () => {
  it('renders footer title and description', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText('footer.title')).toBeInTheDocument();
    expect(screen.getByText('footer.description')).toBeInTheDocument();
  });

  it('renders all hyperlink sections and links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    shopData.footer.hyperlink.forEach((section, sectionIdx) => {
      // Section title
      expect(
        screen.getByText(`footer.hyperlink.${sectionIdx}.title`)
      ).toBeInTheDocument();

      // Section links
      section.links.forEach((_, linkIdx) => {
        expect(
          screen.getByText(`footer.hyperlink.${sectionIdx}.links.${linkIdx}.label`)
        ).toBeInTheDocument();
      });
    });
  });

  it('renders copyright', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText('footer.copyright')).toBeInTheDocument();
  });
});