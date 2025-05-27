/* eslint-disable react/display-name */

import { render, screen } from '@testing-library/react';
import Menu from './index'; // adjust path if needed

const menuList = [
  { id: 1, name: 'Home', link: '/' },
  { id: 2, name: 'About', link: '/about' },
  { id: 3, name: 'Contact', link: '/contact' },
];

describe('Menu', () => {
  test('renders all menu items with correct links', () => {
    render(<Menu menuList={menuList} />);

    menuList.forEach(({ name, link }) => {
      const linkElement = screen.getByRole('link', { name });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', link);
    });
  });

  test('renders the correct number of list items', () => {
    render(<Menu menuList={menuList} />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(menuList.length);
  });
});
