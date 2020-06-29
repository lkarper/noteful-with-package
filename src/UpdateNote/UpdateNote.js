import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotesContext from '../NotesContext/NotesContext';
import ValidationError from '../ValidationError/ValidationError';
import config from '../config';

class UpdateNote extends Component {

    static contextType = NotesContext;

    static defaultProps = {
        match: {
            params: {
                noteId: '',
            }
        },
    }

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

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.name.value && this.context.notes.length && !this.state.name.touched) {
            const note = this.context.notes.find(n => n.id === parseInt(this.props.match.params.noteId));
            if (note) {
                this.setState({
                    name: {
                        value: note.name,
                        touched: true,
                    },
                    folderId: {
                        value: note.folder,
                        touched: true,
                    },
                    content: {
                        value: note.content,
                        touched: true,
                    },
                    error: null,
                });
            } else {
                this.setState({
                    error: 'Could not find note by id.  Check the URL for typos and try again.'
                });
            }
        }
    }

    componentDidMount() {
        if (this.context.notes.length) {
            const note = this.context.notes.find(n => n.id === parseInt(this.props.match.params.noteId));
            if (note) {
                this.setState({
                    name: {
                        value: note.name,
                        touched: true,
                    },
                    folderId: {
                        value: note.folder,
                        touched: true,
                    },
                    content: {
                        value: note.content,
                        touched: true,
                    },
                    error: null,
                });
            } else {
                this.setState({
                    error: 'Could not find note by id.  Check the URL for typos and try again.'
                });
            }
        } 
        
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
                this.props.history.push(`/note/${this.props.match.params.noteId}`);
            })
            .catch(error => {
                console.log('error', error);
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
                        aria-invalid={folderError ? true : false}
                        aria-describedby="folder-aria-required"
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
                <p>Check your connection and try again.</p>
            </div>
        );

        return (
            <div className="add-note-container">
                {(!this.context.notes.length && !this.context.noteError) && <h2>Loading...</h2>}
                {this.context.noteError && 
                    <div className="note-load-error">
                        <h2>Sorry, could not load notes from the server: {this.context.noteError}</h2>
                        <p>Check your network connection and reload the page.</p>
                    </div>
                }  
                {!!this.context.notes.length && 
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
                                Update Note
                        </button> 
                    </form>
                }
                {error ?  errorHTML : ''}
            </div>
        );
    }
}

UpdateNote.propTypes = {
    match: PropTypes.object.isRequired,
}

export default UpdateNote;