import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotesContext from '../NotesContext/NotesContext';
import ValidationError from '../ValidationError/ValidationError';
import './AddNote.css';

class AddNote extends Component {

    static contextType = NotesContext;

    static defaultProps = {
        location: {
            state: {
                folderId: '',
            },
        },
    };

    state = {
        name: {
            value: '',
            touched: false,
        },
        folderId: {
            value: '',
            touched: false,
        },
        content: {
            value: '',
            touched: false,
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

    handleAddNote = (event, cb) => {
        event.preventDefault();
        const newNote = {
            name: this.state.name.value,
            date_modified: (new Date()).toJSON(),
            folder: parseInt(this.state.folderId.value),
            content: this.state.content.value,
        };

        fetch('http://localhost:8000/api/notes', {
            method: 'POST',
            body: JSON.stringify(newNote),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.message);
            })
            .then(data => {
                cb(data);
                this.props.history.push(`/note/${data.id}`);
            })
            .catch(error => {
                console.log(error);
                this.setState({ error: error.message });
            });
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

    componentDidMount() {
        if (this.props.location.state) {
            this.setState({
                folderId: {
                    value: parseInt(this.props.location.state.folderId),
                    touched: true,
                },
            })
        }
    }

    render() {

        const nameError = this.validateNoteName();
        const folderError = this.validateFolderChoice();
        const contentError = this.validateContent();

        const folderRadios = this.context.folders.map(folder => 
                <div key={folder.id}>
                    <input 
                        type="radio" 
                        id={folder.id} 
                        name="folder" 
                        value={folder.id} 
                        onChange={e => this.updateFolderId(e.currentTarget.value)} 
                        checked={this.state.folderId.value === folder.id}
                        aria-invalid={folderError ? true : false}
                        aria-describedby="folder-aria-required"
                        required 
                    />
                    <label htmlFor={folder.id}>{folder.name}</label>
                </div>
            );

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
                    onSubmit={e => this.handleAddNote(e, this.context.addNote)}
                    >
                    <label htmlFor="add-note">Enter name for a new note: </label>
                    <input 
                        type="text" 
                        id="add-note" 
                        name="add-note" 
                        className="note-name" 
                        onChange={e => this.updateName(e.currentTarget.value)}
                        aria-required="true"
                        aria-invalid={nameError ? true : false} 
                        aria-describedby="note-aria-required"
                        required 
                    />
                    <div id="note-aria-required">
                        You must supply a name for your note.
                    </div>
                    {this.state.name.touched && <ValidationError message={nameError} />}
                    <fieldset>
                        <legend>Select a folder to put the new note in: </legend>
                        {folderRadios}
                    </fieldset>
                    <div id="folder-aria-required">
                        You must select a folder in which to place your note.
                    </div>
                    {this.state.folderId.touched && <ValidationError message={folderError} />}
                    <label htmlFor="content">Enter note content here:</label>
                    <textarea
                        id="content" 
                        name="content" 
                        rows="5" 
                        cols="75" 
                        className="note-content"
                        onChange={e => this.updateContent(e.currentTarget.value)} 
                        placeholder="Type your note here..." 
                        aria-required="true"
                        aria-invalid={contentError ? true : false}
                        aria-describedby="content-aria-required"
                        required>
                    </textarea>
                    <div id="content-aria-required">
                        You must add content to your note.
                    </div>
                    {this.state.content.touched && <ValidationError message={contentError} />}
                    <button 
                        type="submit"
                        disabled={nameError || folderError || contentError ? true : false}
                        >
                            Add Note
                    </button> 
                </form>
                {error ?  errorHTML : ''}
            </div>
        );
    }
}

AddNote.propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

export default AddNote;