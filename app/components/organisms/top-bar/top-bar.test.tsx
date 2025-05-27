/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TopBar from './index';

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

jest.mock('../../atoms/search-field', () => (props: any) => {
  return (
    <input
      data-testid="search-field"
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      id={props.id}
    />
  );
});

jest.mock('../../atoms/title', () => (props: any) => {
  return <h2>{props.text}</h2>;
});

describe('TopBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSelector.mockImplementation((selectorFn: any) => {
      if (typeof selectorFn === 'function') {
        return selectorFn({ search: { term: 'initial search' } });
      }
      return 'initial search';
    });
  });

  test('renders Title and SearchField with initial value', () => {
    render(<TopBar />);

    expect(screen.getByText('Share your ideas. Empower your design.')).toBeInTheDocument();

    const input = screen.getByTestId('search-field') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('initial search');
    expect(input.placeholder).toBe("Find the items you’re looking for");
  });

  test('updates input value on change', () => {
    render(<TopBar />);
    const input = screen.getByTestId('search-field') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'new value' } });
    expect(input.value).toBe('new value');
  });

  test('dispatches setSearchTerm action on form submit', () => {
    render(<TopBar />);
    const input = screen.getByTestId('search-field') as HTMLInputElement;
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: 'submitted value' } });
    fireEvent.submit(form);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'search/setSearchTerm',
      payload: 'submitted value',
    });
  });

});
