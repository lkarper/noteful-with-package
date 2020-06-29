import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import NotesSidebar from './NotesSidebar';

const props = {
    match: {
        params: {
            noteId: 'cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1',
        },
    },
}

describe('NotesSideBar Component', () => {
    it('renders the UI without crashing', () => {
        const wrapper = mount(
            <BrowserRouter>
                <NotesSidebar match={props.match} />
            </BrowserRouter>);
        wrapper.unmount();
    });

    it('renders the UI as expected', () => {
        const wrapper = mount(
            <BrowserRouter>
                <NotesSidebar match={props.match} />
            </BrowserRouter>);
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

    it.skip('renders an error when error is passed in context', () => {
        const wrapper = mount(
            <BrowserRouter>
                <NotesSidebar match={props.match} />
            </BrowserRouter>);
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    })
});