import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Main from './Main';

describe('Main component', () => {
    it('renders the UI without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <Main />
            </BrowserRouter>, 
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const wrapper = mount(
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });
});
