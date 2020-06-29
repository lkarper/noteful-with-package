import React from 'react';
import { Link } from 'react-router-dom';
import ShortNote from '../ShortNote/ShortNote';
import NotesContext from '../NotesContext/NotesContext';

const NotesList = () => {
    return (
        <NotesContext.Consumer>
            {value => {
                const error = value.noteError;
                const errorHTML = (
                    <li className="notes-load-error">
                        <h2>Sorry, could not fetch notes from server: {error}.</h2>
                        <p>Check your connection and reload the page.</p>
                    </li>
                );

                const notes = value.notes.map(note => 
                    <ShortNote key={note.id} note={note} />
                );

                return (
                    <section className="notes">
                        {!error && !value.notes.length ? <h2>Loading...</h2> :
                            <>
                                <ul>
                                    {notes.length && !error ? notes : <li>No notes saved.</li>}
                                    {error ? errorHTML : ''}
                                </ul>
                                <Link 
                                    className="add-note-button"
                                    to={{
                                        pathname: "/add-note",
                                        state: {
                                            folderId: null,
                                        },
                                    }}
                                >
                                    Add note
                                </Link>
                            </>
                        }
                    </section>
                );
            }}
        </NotesContext.Consumer>
    );
}

export default NotesList;