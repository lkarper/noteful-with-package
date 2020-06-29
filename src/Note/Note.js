import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotesContext from '../NotesContext/NotesContext';
import config from '../config';

class Note extends Component {

    state = {
        error: null,
    }

    static contextType = NotesContext;

    static defaultProps = {
        match: {
            params: {
                noteId: '',
            },
        },
    }

    deleteNoteRequest = (noteId, cb) => {
        fetch(`${config.API_URL}/notes/${noteId}`, {
            method: 'DELETE',
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
            this.props.history.push('/');
            cb(noteId);
        })
        .catch(error => {
            console.log(error);
            this.setState({ error: error.message });
        });
    }

    render() {
        const error = this.state.error;
        const errorHTML = (
            <div>
                <h2>Could not delete note: {error}.</h2>
                <p>Check your connection and try again.</p>
            </div>
        );

        const note = this.context.notes.find(n => n.id === parseInt(this.props.match.params.noteId));

        if (note) {
            return (
                <section className="notes">
                    <h2>{note.name}</h2>
                    <p>{`Last modified on: ${Date(note.date_modified).toString()}`}</p>
                    <button 
                        type="button"
                        onClick={() => this.deleteNoteRequest(note.id, this.context.deleteNote)}    
                    >Delete Note</button>
                    <Link
                        to={{
                            pathname: `/update-note/${this.props.match.params.noteId}`,
                            state: {...note},
                        }}
                    >Edit Note</Link>
                    {error ? errorHTML : ''}
                    <p>{note.content}</p>
                </section>
            );
        }

        return (
            <section className="notes">
                <h2>Error</h2>
                <p>Could not load note.  Check your connection and reload the page.</p>
            </section>
        );
    }
}

Note.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
}

export default Note;