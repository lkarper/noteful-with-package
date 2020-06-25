import React from 'react';
import { Route } from 'react-router-dom';
import NotesList from '../NotesList/NotesList';
import Folder from '../Folder/Folder';
import Note from '../Note/Note';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import UpdateNote from '../UpdateNote/UpdateNote';
import NotesError from '../NotesError/NotesError';
import AddFolderError from '../AddFolderError/AddFolderError';
import AddNoteError from '../AddNoteError/AddNoteError';
import './Main.css';
import UpdateFolder from '../UpdateFolder/UpdateFolder';

const Main = () => {
    return (
        <main>
            <NotesError>
                <Route 
                    exact path="/"
                    component={NotesList}
                />
                <Route 
                    path="/note/:noteId"
                    component={Note}
                />
                <Route
                    path="/folder/:folderId"
                    component={Folder}
                />
            </NotesError>
            <AddFolderError>
                <Route
                    path="/add-folder"
                    component={AddFolder}
                />
                <Route 
                    path="/update-folder/:folderId"
                    component={UpdateFolder}
                />
            </AddFolderError>
            <AddNoteError>
                <Route
                    path="/add-note"
                    component={AddNote}
                />
                <Route 
                    path="/update-note/:noteId"
                    component={UpdateNote}
                />
            </AddNoteError>
        </main>
    );
}

export default Main;