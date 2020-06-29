import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ShortNote from './ShortNote';

describe('ShortNote component', () => {
    it('renders the UI without crashing', () => {
        const wrapper = mount(
        <BrowserRouter>
            <ShortNote />
        </BrowserRouter>);
        wrapper.unmount();
    });

    it('renders the UI as expected', () => {
        const wrapper = mount(
            <BrowserRouter>
                <ShortNote />
            </BrowserRouter>
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

    it('renders an error message when the delete request fails', () => {
        const wrapper = mount(
            <BrowserRouter>
                <ShortNote />
            </BrowserRouter>
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

});
