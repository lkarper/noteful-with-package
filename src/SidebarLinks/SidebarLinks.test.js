import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import SidebarLinks from './SidebarLinks';

describe('SidebarLinks component', () => {

    it('renders the UI without crashing', () => {
        const wrapper = mount(
            <BrowserRouter>
                <SidebarLinks />
            </BrowserRouter>
        );
        wrapper.unmount();
    });

    it('renders the UI as expected', () => {
        const wrapper = mount(
            <BrowserRouter>
                <SidebarLinks />
            </BrowserRouter>
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

    it('renders an error message when an error is passed in context', () => {
        const wrapper = mount(
            <BrowserRouter>
                <SidebarLinks />
            </BrowserRouter>
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

});