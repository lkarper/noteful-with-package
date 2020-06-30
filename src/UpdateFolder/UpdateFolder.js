import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotesContext from '../NotesContext/NotesContext';
import ValidationError from '../ValidationError/ValidationError';
import config from '../config';

class UpdateFolder extends Component {

    static contextType = NotesContext;

    static defaultProps = {
        match: {
            params: {
                folderId: '',
            },
        },
    }

    state = {
        folder: {
            name: '',
            touched: false,
        },
        error: null,
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.context.folders.length && !prevState.folder.touched && !prevState.error) {
            const folder = this.context.folders.find(f => f.id === parseInt(this.props.match.params.folderId));
            if (folder) {
                this.setState({
                    folder: {
                        name: folder.name,
                        touched: true,
                    },
                    error: null,
                });
            } else if (this.context.folderError) {
                this.setState({
                    error: this.context.folderError,
                });
            } else {
                this.setState({
                    error: 'Could not load folder by id.  Check the URL for typos and try again.'   
                });
            }
        }
    }

    componentDidMount() {
        if (this.context.folders.length) {
            const folder = this.context.folders.find(f => f.id === parseInt(this.props.match.params.folderId));
            if (folder) {
                this.setState({
                    folder: {
                        name: folder.name,
                        touched: true,
                    },
                    error: null,
                });
            } else {
                this.setState({
                    error: 'Could not load folder by id.  Check the URL for typos and try again.'   
                });
            }
        }
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
                    });
                }
            })
            .then(data => {
                this.context.updateFolders({ ...folder, id: parseInt(this.props.match.params.folderId) });
            })
            .catch(error => {
                console.log('error', error);
                this.setState({
                    error: error.message,
                });
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
                <h2>Looks like something went wrong: {error}</h2>
                <p>Folder can not be updated at this time.  Please check your connection and try again.</p>
            </div>
        );
        const nameError = this.validateFolderName();

        const folder = this.context.folders.find(f => f.id === parseInt(this.props.match.params.folderId));
        const oldName = folder ? folder.name : null;

        return (
            <div>
                {(!this.context.folders.length && !this.context.folderError && !error) && <h2>Loading...</h2>}
                {(!!this.context.folders.length && this.state.folder.touched) &&
                    <form 
                        className="add-folder-form"
                        onSubmit={e => this.handleUpdate(e)}
                    >
                        <label htmlFor="folder-name">{`Enter a new name for the folder "${oldName}":`}</label>
                        <input 
                            type="text" 
                            id="folder-name" 
                            name="folder-name" 
                            onChange={e => this.updateFolderName(e.currentTarget.value)} 
                            value={this.state.folder.name}
                            aria-required="true"
                            aria-invalid={nameError ? true : false}
                            aria-describedby="aria-description"
                            required 
                        />
                        <span id="aria-description">You must enter a new name for your folder.</span>
                        {this.state.folder.touched && <ValidationError message={nameError} />}
                        <button 
                            type="submit"
                            disabled={nameError ? true : false}
                        >
                            Update Folder
                        </button>
                    </form>
                }
                {error ?  errorHTML : ''}
            </div>
        );
    }
}

UpdateFolder.propTypes = {
    match: PropTypes.object.isRequired,
}

export default UpdateFolder;