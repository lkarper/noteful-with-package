import React from 'react';
import ReactDOM from 'react-dom';
import UpdateFolder from './UpdateFolder';

describe('UpdateFolder component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<UpdateFolder />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});