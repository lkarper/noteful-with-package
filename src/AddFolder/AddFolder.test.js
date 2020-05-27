import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AddFolder from './AddFolder';

describe.skip('AddFolder component', () => {

    it('renders the UI without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AddFolder />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const wrapper = shallow(<AddFolder />);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('renders an error message when the input contains no characters', () => {
        const wrapper = shallow(<AddFolder />);
        wrapper.find('input').simulate('change', { currentTarget: {name: 'folder-name', value: ' '} });
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('disables submit button when input is blank', () => {
        const wrapper = shallow(<AddFolder />);
        wrapper.find('button').simulate('click');
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('enables submit button when valid folder name is entered', () => {
        const wrapper = shallow(<AddFolder />);
        wrapper.find('input').simulate('change', { currentTarget: {name: 'folder-name', value: 'valid folder name'} });
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

});