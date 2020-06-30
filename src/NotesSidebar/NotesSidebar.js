import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotesContext from '../NotesContext/NotesContext';

const NotesSidebar = (props) => {
    return (
        <NotesContext.Consumer>
            {value => {
                const loading = value.notes.length ? false : true;
                const error = value.folderError;
                let folderIdToMatch;
                const noteInContext = value.notes
                    .find(note => note.id === parseInt(props.match.params.noteId));
                if (noteInContext) { 
                    folderIdToMatch = value.notes
                        .find(note => note.id === parseInt(props.match.params.noteId))
                        .folder;
                }

                const folder = folderIdToMatch ? value.folders.find(f => f.id === folderIdToMatch) : null;

                if (folder) {
                    return (
                        <nav className="sidebar">
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
                        {loading && !error ? <p>Loading...</p> : 
                            <>
                                <h2>Sorry, could not load your folder.</h2>
                                <p>Check your query for errors, check your network connection and reload the page.</p>
                            </>
                        }
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
    history: {
        push: () => {},
    }
}

NotesSidebar.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

export default NotesSidebar;