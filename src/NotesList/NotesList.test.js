import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import NotesList from './NotesList';

describe('NotesList component', () => {
    it('renders the UI without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <NotesList />
            </BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const wrapper = mount(
            <BrowserRouter>
                <NotesList />
            </BrowserRouter>);
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

    it('renders an error message when there is a notes error passed in context', () => {
        const wrapper = mount(
            <BrowserRouter>
                <NotesList />
            </BrowserRouter>);
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    })
});