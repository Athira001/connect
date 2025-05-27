/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from '@testing-library/react';
import Header from './index';

jest.mock('../../molecules/menu', () => {
  return function DummyMenu(props: { menuList: any[] }) {
    return (
      <nav data-testid="mock-menu">
        {props.menuList.map((item) => (
          <a key={item.id} href={item.link}>
            {item.name}
          </a>
        ))}
      </nav>
    );
  };
});

describe('Header', () => {
  test('renders header container and menu items', () => {
    render(<Header />);

    const header = screen.getByRole('banner'); // header landmark role
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('containerFluid');

    const logoLink = screen.getByRole('link', { name: /go to main page/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink.querySelector('img')).toHaveAttribute(
      'src',
      'https://storagefiles.clo-set.com/public/connect/common/connect-desktop-header-bi.svg'
    );

    const menu = screen.getByTestId('mock-menu');
    expect(menu).toBeInTheDocument();

    ['Store', 'Gallery', 'Contest', 'Community', 'Apps'].forEach((name) => {
      expect(menu).toHaveTextContent(name);
    });

    const signInBtn = screen.getByRole('button', { name: /sign in/i });
    expect(signInBtn).toBeInTheDocument();
    expect(signInBtn).toHaveClass('signInButton');
  });
});
