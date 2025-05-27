/* eslint-disable react/display-name */


import { render, screen } from '@testing-library/react';
import Title from './index'; // adjust path if needed

describe('Title', () => {
  test('renders with default empty text', () => {
    render(<Title />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('');
  });

  test('renders with provided text', () => {
    const testText = 'Hello World';
    render(<Title text={testText} />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(testText);
  });
});
