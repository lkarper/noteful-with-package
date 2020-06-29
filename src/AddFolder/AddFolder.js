import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotesContext from '../NotesContext/NotesContext';
import ValidationError from '../ValidationError/ValidationError';
import config from '../config';
import './AddFolder.css';

class AddFolder extends Component {

    static contextType = NotesContext;

    static defaultProps = {
        history: {
            push: () => {},
        }
    }

    state = {
        folder: {
            name: '',
            touched: false,
        },
        error: null,
    }

    handleNewFolder = (event, cb) => {
        event.preventDefault();
        const newFolder = {
            name: this.state.folder.name,
        };

        fetch(`${config.API_URL}/folders`, {
            method: 'POST',
            body: JSON.stringify(newFolder),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.message);
            })
            .then(data => {
                cb(data);
                this.props.history.push(`/folder/${data.id}`);
            })
            .catch(error => {
                console.log(error);
                this.setState({ error: error.message });
            });
    }

    updateFolderName = (name) => {
        this.setState({
            folder: {
                name,
                touched: true,
            },
        });
    }

    validateFolderName = () => {
        const name = this.state.folder.name.trim();
        if (name.length === 0) {
            return 'Name is required and must contain at least one character.';
        }
    }

    render() {
        const { error } = this.state;
        const errorHTML = (
            <div className="folder-error">
                <h2>Looks like something went wrong: {error}.</h2>
                <p>A new folder could not be created at this time.  Please try again later.</p>
            </div>
        );
        const nameError = this.validateFolderName();

        return (
            <div>
                <form className="add-folder-form" onSubmit={e => this.handleNewFolder(e, this.context.addFolder)}>
                    <label htmlFor="folder-name">Enter a name for a new folder:</label>
                    <input 
                        type="text" 
                        id="folder-name" 
                        name="folder-name" 
                        onChange={e => this.updateFolderName(e.currentTarget.value)}
                        aria-required="true"
                        aria-describedby="aria-description"
                        aria-invalid={nameError ? true : false} 
                        required 
                    />
                    <span id="aria-description">You must enter a name for your folder.</span>
                    {this.state.folder.touched && <ValidationError message={nameError} />}
                    <button 
                        type="submit"
                        disabled={nameError ? true : false}
                        className="add-folder-button"
                    >
                        Create Folder
                    </button>
                </form>
                {error ?  errorHTML : ''}
            </div>
        );
    }
}

AddFolder.propTypes = {
    history: PropTypes.object.isRequired,
}

export default AddFolder;