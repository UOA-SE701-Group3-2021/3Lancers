import React from 'react';
import JournalText from 'JournalText';
import renderer from 'react-test-renderer';

test("Textbox text state updates correctly", ()=> {
    let component = renderer.create(<JournalText />).getInstance();
})