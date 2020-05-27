import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import SidebarError from './SidebarError';
import SidebarLinks from '../SidebarLinks/SidebarLinks';
import NotesSidebar from '../NotesSidebar/NotesSidebar';


describe('SidebarError component', () => {

    it('renders the UI without crashing', () => {
        const wrapper = mount(
            <SidebarError>
                <BrowserRouter>
                    <SidebarLinks />
                </BrowserRouter>
            </SidebarError>
        );
        wrapper.unmount();
    });

    it('renders the UI as expected', () => {
        const wrapper = mount(
            <SidebarError>
                <BrowserRouter>
                    <SidebarLinks />
                </BrowserRouter>
            </SidebarError>
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

    it('renders an error message when an error occurs in the DOM tree beneath it', () => {
        const wrapper = mount(
            <SidebarError>
                <BrowserRouter>
                    <NotesSidebar location={""} />
                </BrowserRouter>
            </SidebarError>
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

});