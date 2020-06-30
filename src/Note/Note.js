import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotesContext from '../NotesContext/NotesContext';
import config from '../config';

class Note extends Component {

    state = {
        note: {},
        error: null,
    }

    static contextType = NotesContext;

    static defaultProps = {
        match: {
            params: {
                noteId: '',
            },
        },
        history: {
            push: () => {},
        }
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
            if (!response.ok) {
                return response.json().then(error => {
                    throw error;
                });
            }
        })
        .then(data => {
            cb(noteId);
            this.props.history.push('/');
        })
        .catch(error => {
            console.log(error);
            this.setState({ error: error.message });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (!Object.keys(prevState.note).length && this.context.notes.length && !prevState.error) {
            const note = this.context.notes.find(n => n.id === parseInt(this.props.match.params.noteId));
            if (note) {
                this.setState({
                    note,
                    error: null,
                });
            } else {
                this.setState({
                    error: 'Could not find note by id.  Check the URL for typos and try again.'
                })
            }
        } 
    }

    componentDidMount() {
        if (this.context.notes.length) {
            const note = this.context.notes.find(n => n.id === parseInt(this.props.match.params.noteId));
            if (note) {
                this.setState({
                    note,
                    error: null,
                });
            } else {
                this.setState({
                    error: 'Could not find note by id.  Check the URL for typos and try again.'
                });
            }
        }
    }

    render() {
        const error = this.state.error;
        const errorHTML = (
            <div>
                <h2>Could not delete note: {error}.</h2>
                <p>Check your connection and try again.</p>
            </div>
        );

        const { note } = this.state;

        if (Object.keys(note).length) {
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
                            pathname: `/note/${this.props.match.params.noteId}/update-note`,
                        }}
                    >Edit Note</Link>
                    {error ? errorHTML : ''}
                    <p>{note.content}</p>
                </section>
            );
        }

        return (
            <section className="notes">
                {this.state.error || this.context.noteError ?
                    <> 
                        <h2>Error: {this.state.error || this.context.noteError}</h2>
                        <p>Check your connection and reload the page.</p>
                    </>
                    : <h2>Loading...</h2>
                }
            </section>
        );
    }
}

Note.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
}

export default Note;