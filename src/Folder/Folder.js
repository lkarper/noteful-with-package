import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShortNote from '../ShortNote/ShortNote';
import NotesContext from '../NotesContext/NotesContext';
import './Folder.css';

const Folder = (props) => {

    const deleteFolder = (id, cb) => {
        fetch(`http://localhost:8000/api/folders/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
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
                        <button onClick={() => deleteFolder(parseInt(props.match.params.folderId), value.deleteFolder)}>Delete Folder</button>
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