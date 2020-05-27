import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AddFolderError from './AddFolderError';
import SidebarLinks from '../SidebarLinks/SidebarLinks';
import NotesSidebar from '../NotesSidebar/NotesSidebar';

describe.skip('AddFolderError component', () => {

    it('renders the UI without crashing', () => {
        const wrapper = mount(
            <AddFolderError>
                <BrowserRouter>
                    <SidebarLinks />
                </BrowserRouter>
            </AddFolderError>
        );
        wrapper.unmount();
    });

    it('renders the UI as expected', () => {
        const wrapper = mount(
            <AddFolderError>
                <BrowserRouter>
                    <SidebarLinks />
                </BrowserRouter>
            </AddFolderError>
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

    it('renders an error message when an error occurs in the DOM tree beneath it', () => {
        const wrapper = mount(
            <AddFolderError>
                <BrowserRouter>
                    <NotesSidebar />
                </BrowserRouter>
            </AddFolderError>
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

});