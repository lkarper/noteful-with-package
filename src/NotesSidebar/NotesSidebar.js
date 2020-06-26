import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotesContext from '../NotesContext/NotesContext';

const NotesSidebar = (props) => {
    return (
        <NotesContext.Consumer>
            {value => {
                const error = value.folderError;
                const errorHTML = (
                    <div className="folder-load-error">
                        <h2>Sorry, could not load folders from the server: {error}.</h2>
                        <p>Check your network connection and reload the page.</p>
                    </div>
                );
                let folderIdToMatch;
                if (value.notes.length) { 
                    folderIdToMatch = value.notes
                        .find(note => note.id === parseInt(props.match.params.noteId))
                        .folder;
                }

                const folder = folderIdToMatch ? value.folders.find(f => f.id === folderIdToMatch) : null;

                if (folder) {
                    return (
                        <nav className="sidebar">
                            {error ? errorHTML : ''}
                            <NavLink
                                className="folder-link"
                                activeClassName="highlighted"
                                to={`/folder/${folder.id}`}
                            >
                                {folder.name}
                            </NavLink>
                            <button 
                                type="buton"
                                onClick={() => props.history.push(`/folder/${folder.id}`)}
                            >
                                Back to folder
                            </button>
                        </nav>
                    );
                }
                return (
                    <nav className="sidebar">
                        <h2>Sorry, could not load folders.</h2>
                        <p>Check your network connection and reload the page.</p>
                    </nav>
                );
            }}
        </NotesContext.Consumer>
    );
}

NotesSidebar.defaultProps = {
    match: {
        params: {
            noteId: '',
        },
    },
}

NotesSidebar.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

export default NotesSidebar;