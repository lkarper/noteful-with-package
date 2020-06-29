import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AddNoteError from './AddNoteError';
import AddNote from '../AddNote/AddNote';

describe('AddNoteError component', () => {

    it('renders the UI without crashing', () => {
        const wrapper = mount(
            <AddNoteError>
                <BrowserRouter>
                    <AddNote />
                </BrowserRouter>
            </AddNoteError>
        );
        wrapper.unmount();
    });

    it('renders the UI as expected', () => {
        const wrapper = mount(
            <AddNoteError>
                <BrowserRouter>
                    <AddNote />
                </BrowserRouter>
            </AddNoteError>
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

    it('renders an error message when an error occurs in the DOM tree beneath it', () => {
        const wrapper = mount(
            <AddNoteError>
                <BrowserRouter>
                    <AddNote location={""} />
                </BrowserRouter>
            </AddNoteError>
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

});