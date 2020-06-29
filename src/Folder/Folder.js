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
              })
            }
          })
        .then(data => {
            props.history.push('/');
            cb(id);
        })
        .catch(error => {
            console.log(error);
            setDeleteFail(true);
        });
    }
    return (
        <NotesContext.Consumer>
            {value => {
                const notes = value.notes
                    .filter(note => note.folder === parseInt(props.match.params.folderId))
                    .map(note =>
                        <ShortNote key={note.id} note={note} />
                    );
                
                return (
                    <section className="notes">
                        {!value.notes.length ? <p>Loading...</p> :
                            <>
                                <ul>
                                    {notes}
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
                                        pathname: `/update-folder/${props.match.params.folderId}`,
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