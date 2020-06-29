import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotesContext from '../NotesContext/NotesContext';
import ValidationError from '../ValidationError/ValidationError';
import config from '../config';

class UpdateNote extends Component {

    static contextType = NotesContext;

    static defaultProps = {
        location: {
            state: {
                name: '',
                folder: '',
                content: '',
            }
        },
        match: {
            params: {
                noteId: '',
            }
        },
    }

    state = {
        name: {
            value: this.props.location.state.name,
            touched: true,
        },
        folderId: {
            value: parseInt(this.props.location.state.folder),
            touched: true,
        },
        content: {
            value: this.props.location.state.content,
            touched: true,
        },
        error: null,
    }

    updateName = (name) => {
        this.setState({
            name: {
                value: name,
                touched: true,
            },
        });
    }

    updateFolderId = (folderId) => {
        this.setState({
            folderId: {
                value: parseInt(folderId),
                touched: true,
            },
        });
    }

    updateContent = (content) => {
        this.setState({
            content: {
                value: content,
                touched: true,
            },
        });
    }

    handleUpdate = (event) => {
        event.preventDefault();

        const note = {
            name: this.state.name.value,
            folder: parseInt(this.state.folderId.value),
            content: this.state.content.value,
            date_modified: (new Date()).toJSON(),
        }

        fetch(`${config.API_URL}/notes/${this.props.match.params.noteId}`, {
            method: 'PATCH',
            body: JSON.stringify(note),
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
                this.context.updateNotes({...note, id: parseInt(this.props.match.params.noteId)});
                this.props.history.push('/');
            })
            .catch(error => {
                console.log('error', error);
            })
    }

    validateNoteName = () => {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
            return 'The note must be named and the name must contain at least one character.';
        }
    }

    validateFolderChoice = () => {
        if (!this.state.folderId.value) {
            return 'You must select a folder in which to place your note.';
        }
    }

    validateContent = () => {
        const content = this.state.content.value.trim();
        if (content.length === 0) {
            return 'You must add content to your note and it must contain at least one character.';
        }
    }

    render() {
        const folderRadios = this.context.folders.map(folder => 
                <div key={folder.id}>
                    <input 
                        type="radio" 
                        id={folder.id} 
                        name="folder" 
                        value={folder.id} 
                        onChange={e => this.updateFolderId(e.currentTarget.value)} 
                        checked={this.state.folderId.value === folder.id}
                        required 
                    />
                    <label htmlFor={folder.id}>{folder.name}</label>
                </div>
            );

        const nameError = this.validateNoteName();
        const folderError = this.validateFolderChoice();
        const contentError = this.validateContent();

        const { error } = this.state;
        const errorHTML = (
            <div className="folder-error">
                <h2>Looks like something went wrong: {error}.</h2>
                <p>A new note could not be created.  Please try again later.</p>
            </div>
        );

        return (
            <div className="add-note-container">
                <form 
                    className="add-note-form"
                    onSubmit={e => this.handleUpdate(e)}
                    >
                    <label htmlFor="add-note">Enter name for a new note: </label>
                    <input 
                        type="text" 
                        id="add-note" 
                        name="add-note" 
                        className="note-name"
                        value={this.state.name.value} 
                        onChange={e => this.updateName(e.currentTarget.value)} 
                        required 
                    />
                    {this.state.name.touched && <ValidationError message={nameError} />}
                    <fieldset>
                        <legend>Select a folder to put the new note in: </legend>
                        {folderRadios}
                    </fieldset>
                    {<ValidationError message={folderError} />}
                    <label htmlFor="content">Enter note content here:</label>
                    <textarea 
                        id="content" 
                        name="content" 
                        rows="5" 
                        cols="75" 
                        className="note-content"
                        onChange={e => this.updateContent(e.currentTarget.value)} 
                        placeholder="Type your note here..." 
                        value={this.state.content.value}
                        required>
                    </textarea>
                    {this.state.content.touched && <ValidationError message={contentError} />}
                    <button 
                        type="submit"
                        disabled={nameError || folderError || contentError ? true : false}
                        >
                            Update Note
                    </button> 
                </form>
                {error ?  errorHTML : ''}
            </div>
        );
    }
}

UpdateNote.propTypes = {
    location: PropTypes.shape({
        state: PropTypes.shape({
            name: PropTypes.string.isRequired,
            folder: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]).isRequired,
            content: PropTypes.string.isRequired,
        })
    }).isRequired,
    match: PropTypes.object.isRequired,
}

export default UpdateNote;