/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from '@testing-library/react';
import Footer from './index';


jest.mock('../../molecules/menu', () => {
  return function DummyMenu(props: { menuList: any[] }) {
    return (
      <div data-testid="mock-menu">
        {props.menuList.map((item) => (
          <span key={item.id}>{item.name}</span>
        ))}
      </div>
    );
  };
});

describe('Footer', () => {
  test('renders footer with Menu component and menu items', () => {
    render(<Footer />);


    const footer = screen.getByRole('contentinfo'); 
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('footerFluid');

    const menu = screen.getByTestId('mock-menu');
    expect(menu).toBeInTheDocument();

    ['Terms', 'Privacy', 'Cookies', 'Help Center'].forEach((menuName) => {
      expect(menu).toHaveTextContent(menuName);
    });
  });
});
