import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Input } from '@/components/input';

test('renders Input component', () => {
    const { getByPlaceholderText } = render(
        <Input state="state" setState={() => { }} value="value" placeHolder="placeHolder" withoutLabel />
    );
    console.log(getByPlaceholderText);
    const inputElement = getByPlaceholderText('placeHolder');
    expect(inputElement).toBeInTheDocument();
});

test('changes state when input is changed', () => {
    const setState = jest.fn();
    const { getByPlaceholderText } = render(
        <Input state="state" setState={setState} value="value" placeHolder="placeHolder" withoutLabel />
    );
    const inputElement = getByPlaceholderText(/placeHolder/i);
    fireEvent.change(inputElement, { target: { value: 'newValue' } });
    expect(setState).toHaveBeenCalledTimes(1);
});

test('updates class when input has content', () => {
    const { getByPlaceholderText, rerender } = render(
        <Input state="state" setState={() => { }} value="value" placeHolder="placeHolder" withoutLabel />
    );
    const inputElement = getByPlaceholderText(/placeHolder/i);
    expect(inputElement.parentElement).not.toHaveClass('active-input');
    rerender(<Input state="newState" setState={() => { }} placeHolder="placeHolder" />);
    expect(inputElement.parentElement).toHaveClass('active-input');
});