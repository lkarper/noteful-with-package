import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotesContext from '../NotesContext/NotesContext';
import ValidationError from '../ValidationError/ValidationError';
import config from '../config';

class UpdateFolder extends Component {

    static contextType = NotesContext;

    static defaultProps = {
        location: {
            state: {
                name: '',
            }
        },
        match: {
            params: {
                folderId: '',
            }
        },
    }

    state = {
        folder: {
            name: this.props.location.state.name,
            touched: true,
        },
        error: null,
    }

    handleUpdate = (event) => {
        event.preventDefault();
        const folder = {
            name: this.state.folder.name,
        }

        fetch(`${config.API_URL}/folders/${this.props.match.params.folderId}`, {
            method: 'PATCH',
            body: JSON.stringify(folder),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error;
                    })
                }
            })
            .then(data => {
                this.context.updateFolders({...folder, id: parseInt(this.props.match.params.folderId)});
            })
            .catch(error => {
                console.log('error', error);
            })
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
                <form onSubmit={e => this.handleUpdate(e)}>
                    <label htmlFor="folder-name">Enter a name for a new folder:</label>
                    <input 
                        type="text" 
                        id="folder-name" 
                        name="folder-name" 
                        onChange={e => this.updateFolderName(e.currentTarget.value)} 
                        value={this.state.folder.name}
                        required 
                    />
                    {this.state.folder.touched && <ValidationError message={nameError} />}
                    <button 
                        type="submit"
                        disabled={nameError ? true : false}
                    >
                        Update Folder
                    </button>
                </form>
                {error ?  errorHTML : ''}
            </div>
        );
    }
}

UpdateFolder.propTypes = {
    location: PropTypes.shape({
        state: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    match: PropTypes.object.isRequired,
}

export default UpdateFolder;