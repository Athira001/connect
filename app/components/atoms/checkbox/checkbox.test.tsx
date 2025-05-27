/* eslint-disable react/display-name */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from './index';

describe('Checkbox component', () => {
  it('renders the label', () => {
    render(
      <Checkbox
        label="Accept terms"
        checked={false}
        onChange={() => {}}
      />
    );

    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
  });

  it('checkbox is unchecked by default', () => {
    render(
      <Checkbox
        label="Accept terms"
        checked={false}
        onChange={() => {}}
      />
    );

    const checkbox = screen.getByLabelText('Accept terms') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it('checkbox is checked when checked=true', () => {
    render(
      <Checkbox
        label="Accept terms"
        checked={true}
        onChange={() => {}}
      />
    );

    const checkbox = screen.getByLabelText('Accept terms') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('calls onChange handler when clicked', () => {
    const handleChange = jest.fn();
    render(
      <Checkbox
        label="Accept terms"
        checked={false}
        onChange={handleChange}
      />
    );

    const checkbox = screen.getByLabelText('Accept terms');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
