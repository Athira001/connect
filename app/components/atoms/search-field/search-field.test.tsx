/* eslint-disable react/display-name */

import { render, screen, fireEvent } from '@testing-library/react';
import SearchField from './index'; // adjust path if needed

describe('SearchField', () => {
  const defaultProps = {
    name: 'search',
    value: '',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders input with correct props', () => {
    render(<SearchField {...defaultProps} />);

    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('name', defaultProps.name);
    expect(input).toHaveAttribute('placeholder', 'Placeholder text...');
    expect(input).not.toBeRequired();
  });

  test('calls onChange handler with event and name', () => {
    render(<SearchField {...defaultProps} />);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'hello' } });

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onChange).toHaveBeenCalledWith(expect.any(Object), defaultProps.name);
  });

  test('renders clear button when value and onClear are provided', () => {
    const onClear = jest.fn();

    render(<SearchField {...defaultProps} value="some text" onClear={onClear} />);

    const clearButton = screen.getByRole('button', { name: /clear input/i });
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  test('does not render clear button when value is empty', () => {
    const onClear = jest.fn();

    render(<SearchField {...defaultProps} value="" onClear={onClear} />);
    const clearButton = screen.queryByRole('button', { name: /clear input/i });
    expect(clearButton).not.toBeInTheDocument();
  });
});
