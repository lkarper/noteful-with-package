import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { mount, shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Note from './Note';
import STORE from '../store';

const props = {
    match: {
        params: {
            noteId: 'cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1',
        },
    },
}

describe.skip('Note component', () => {

    it('renders the UI without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Note />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected when no match prop is passed', () => {
        const wrapper = mount(<Note />);
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

    it('renders the UI as expected when a match prop is passed', () => {
        const wrapper = mount(<Note match={props.match} />, { 
            context: STORE,
            childContextTypes: {folders: PropTypes.array, notes: PropTypes.array }
        });
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });
});