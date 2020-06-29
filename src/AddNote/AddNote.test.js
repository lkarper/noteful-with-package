import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AddNote from './AddNote';

describe('AddNote component', () => {

    const context = {
        folders: [
            {
                name: "Test",
                id: 1,
            }
        ]
    }

    it('renders the UI without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AddNote />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const wrapper = mount(<AddNote />);
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

    it('renders an error message when the note name input contains no characters', () => {
        const wrapper = mount(<AddNote />, { context });
        wrapper.setContext({
            folders: [
                {
                    name: "Test",
                    id: 1,
                }
            ]
        });
        wrapper.find('.note-name').simulate('change', { currentTarget: {name: 'add-note', value: ' '} });
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

    it('renders an error message when no folder is clicked', () => {
        const wrapper = mount(<AddNote />, { context });
        wrapper.setContext({
            folders: [
                {
                    name: "Test",
                    id: 1,
                }
            ]
        });
        wrapper.find('.note-name').simulate('change', { currentTarget: {name: 'add-note', value: 'valid note name'} });
        wrapper.find('textarea').simulate('change', { currentTarget: {name: 'content', value: ' '} });
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

    it('does not display an error message when folder is clicked', () => {
        const wrapper = mount(<AddNote />, { context });
        wrapper.setContext({
            folders: [
                {
                    name: "Test",
                    id: 1,
                }
            ]
        });
        wrapper.setState({
            folderId: {
                value: 'b07162f0-ffaf-11e8-8eb2-f2801f1b9fd1',
                touched: true,
            },
        });
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

    it('renders an error message when no content is added to the note', () => {
        const wrapper = mount(<AddNote />, { context });
        wrapper.setContext({
            folders: [
                {
                    name: "Test",
                    id: 1,
                }
            ]
        });
        wrapper.find('.note-content').simulate('change', { currentTarget: {name: 'content', value: ' '} });
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    })

    it('disables submit button when input is blank', () => {
        const wrapper = mount(<AddNote />, { context });
        wrapper.setContext({
            folders: [
                {
                    name: "Test",
                    id: 1,
                }
            ]
        });
        wrapper.find('button').simulate('click');
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

    it('enables submit button when valid note name, folder, and content are provided', () => {
        const wrapper = mount(<AddNote />, { context });
        wrapper.setContext({
            folders: [
                {
                    name: "Test",
                    id: 1,
                }
            ]
        });
        wrapper.setState({
                name: {
                    value: 'name',
                    touched: true,
                },
                folderId: {
                    value: 'b07162f0-ffaf-11e8-8eb2-f2801f1b9fd1',
                    touched: true,
                },
                content: {
                    value: 'content',
                    touched: true,
                },
                error: null,
            });
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

});