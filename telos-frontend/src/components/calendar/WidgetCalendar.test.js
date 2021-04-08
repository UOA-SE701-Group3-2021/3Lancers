import { fireEvent, render, cleanup } from '@testing-library/react';
import WidgetCalendar from './WidgetCalendar';

afterEach(cleanup);

test('Testing the WidgetCalendar', () => {
  const { asFragment, container } = render(<WidgetCalendar />);

  expect(asFragment(<WidgetCalendar />)).toMatchSnapshot();

  fireEvent.click(container.firstChild);

  expect(container.firstChild).toHaveClass('widgetIcon vertical');
});
