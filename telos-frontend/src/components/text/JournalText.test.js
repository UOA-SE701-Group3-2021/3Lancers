import { fireEvent, render, screen } from '@testing-library/react';
import JournalText from './JournalText';

test('Textbox text state updates', () => {
  render(<JournalText />);

  // get the textarea within the Journal Text widget
  const textarea = screen.getByTestId('textInput');

  // check initially empty text content
  expect(textarea).toHaveTextContent('');

  // fire onChange event to update the text state of the component
  fireEvent.change(textarea, { target: { value: 'Hello World!' } });

  // check value of re-rendered textarea is reflective of the state update (re-rendered by react on state change)
  expect(textarea).toHaveTextContent('Hello World!');
});
