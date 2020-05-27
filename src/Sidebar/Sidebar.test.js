import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Sidebar from './Sidebar';

describe.skip('Sidebar component', () => {
    it('renders the UI without crashing', () => {
        const wrapper = mount(
            <BrowserRouter>
                <Sidebar />
            </BrowserRouter>
        );
        wrapper.unmount();
    });

    it('renders the UI as expected', () => {
        const wrapper = mount(
            <BrowserRouter>
                <Sidebar />
            </BrowserRouter>
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });
    
});