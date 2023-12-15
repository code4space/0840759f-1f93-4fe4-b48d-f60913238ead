import { render, fireEvent } from '@testing-library/react';
import ModalPopUp from '@/components/modal';

test('renders ModalPopUp component with title, children, and close function', () => {
 const closeMock = jest.fn();

 const { getByText, getByTestId } = render(
    <ModalPopUp title="Test Title" close={closeMock}>
      <div data-testid="children">Test Content</div>
    </ModalPopUp>
 );

 expect(getByText('Test Title')).toBeTruthy();

 fireEvent.click(getByTestId('closeIcon'));
 expect(closeMock).toHaveBeenCalledTimes(1);
});