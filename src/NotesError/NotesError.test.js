import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import NotesError from './NotesError';
import NotesList from '../NotesList/NotesList';
import Note from '../Note/Note';

describe.skip('NotesError component', () => {

    it('renders the UI without crashing', () => {
        const wrapper = mount(
            <NotesError>
                <BrowserRouter>
                    <NotesList />
                </BrowserRouter>
            </NotesError>
        );
        wrapper.unmount();
    });

    it('renders the UI as expected', () => {
        const wrapper = mount(
            <NotesError>
                <BrowserRouter>
                    <NotesList />
                </BrowserRouter>
            </NotesError>
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

    it('renders an error message when an error occurs in the DOM tree beneath it', () => {
        const wrapper = mount(
            <NotesError>
                <BrowserRouter>
                    <Note location={""} />
                </BrowserRouter>
            </NotesError>
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

});