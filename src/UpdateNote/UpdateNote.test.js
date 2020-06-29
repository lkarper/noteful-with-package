import React from 'react';
import ReactDOM from 'react-dom';
import UpdateNote from './UpdateNote';

describe('UpdateNote component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<UpdateNote />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});