import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShortNote from '../ShortNote/ShortNote';
import NotesContext from '../NotesContext/NotesContext';
import config from '../config';
import './Folder.css';

const Folder = (props) => {

    const [deleteFail, setDeleteFail] = useState(false);

    const deleteFolder = (id, cb) => {
        fetch(`${config.API_URL}/folders/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            },
        })
        .then(res => {
            if (!res.ok) {
              // get the error message from the response,
              return res.json().then(error => {
                // then throw it
                throw error
              });
            }
          })
        .then(data => {
            props.history.push('/');
            setDeleteFail(false);
            cb(id);
        })
        .catch(error => {
            console.log(error);
            setDeleteFail(true);
        });
    }

    const verifyFolderId = (folders) => {
        const { folderId } = props.match.params;
        return folders.findIndex(f => f.id === parseInt(folderId)) !== -1;
    }

    return (
        <NotesContext.Consumer>
            {value => {
                const notes = value.notes
                    .filter(note => note.folder === parseInt(props.match.params.folderId))
                    .map(note =>
                        <ShortNote key={note.id} note={note} />
                    );
                const error = value.noteError;
                const errorHTML = (
                    <li className="notes-load-error">
                        <h2>Sorry, could not fetch notes from server: {error}.</h2>
                        <p>Check your connection and reload the page.</p>
                    </li>
                );
                
                return (
                    <section className="notes">
                        {(!value.notes.length && !value.folderError) && <p>Loading...</p>}
                        {(!!value.notes.length && !verifyFolderId(value.folders)) && 
                            <div>
                                <h2>Error</h2>
                                <p>Could not find folder by id.  Check the URL for typos and try again.</p>
                            </div>
                        }
                        {(!!value.notes.length && verifyFolderId(value.folders)) &&
                            <>
                                <ul>
                                    {notes.length ? notes : <li>No notes added to this folder yet.</li>}
                                    {error ? errorHTML : ''}
                                </ul>
                                <Link 
                                    className="add-note-button"
                                    to={{
                                        pathname: "/add-note",
                                        state: {
                                            folderId: props.match.params.folderId,
                                        },
                                    }}
                                >
                                    Add note
                                </Link>
                                <Link 
                                    className="add-note-button"
                                    to={{
                                        pathname: `/folder/${props.match.params.folderId}/update-folder`,
                                        state: {
                                            name: `${value.folders.length ? value.folders.find(f => f.id === parseInt(props.match.params.folderId)).name : null}`,
                                        },
                                    }}
                                >
                                    Change Folder Name
                                </Link>
                                <button className="delete-folder-button" onClick={() => deleteFolder(parseInt(props.match.params.folderId), value.deleteFolder)}>Delete Folder</button>
                            </>
                        }
                        {deleteFail ? <p>Error: failed to delete folder.  Check your connection and try again.</p> : ''}
                    </section>
                );
            }}
        </NotesContext.Consumer>
    );
}

Folder.defaultProps = {
    match: {
        params: {
            folderId: '',
        },
    },
};

Folder.propTypes = {
    match: PropTypes.object.isRequired,
}

export default Folder;