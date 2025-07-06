import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSwitcher from '../LanguageSwitcher';
import localizationConstants from '../../../constants/localization';
import * as localizationHelpers from '../../../helpers/localization';

jest.mock('antd', () => ({
  Avatar: ({ src, ...props }: any) => <img src={src} alt="avatar" {...props} />,
}));

jest.mock('../../../helpers/localization', () => ({
  getCurrentLanguage: jest.fn(() => 'en'),
  changeLanguage: jest.fn(),
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('selects a language and calls changeLanguage', () => {
    render(<LanguageSwitcher />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    const viRegion = localizationConstants.REGIONS['vi'];
    const viButton = screen.getByText(viRegion.name).closest('button');
    fireEvent.click(viButton!);

    expect(localizationHelpers.changeLanguage).toHaveBeenCalledWith('vi');
  });

  
});