import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ValidationError from './ValidationError';

describe('ValidationError component', () => {
    
    it('renders the UI without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ValidationError />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected when there is no error', () => {
        const wrapper = shallow(<ValidationError />);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('renders the UI as expected when passed an error message in props', () => {
        const wrapper = shallow(<ValidationError message={"Failure to fetch"}/>);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
    
});