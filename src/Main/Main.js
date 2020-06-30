import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotesList from '../NotesList/NotesList';
import Folder from '../Folder/Folder';
import Note from '../Note/Note';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import UpdateNote from '../UpdateNote/UpdateNote';
import UpdateFolder from '../UpdateFolder/UpdateFolder';
import NotesError from '../NotesError/NotesError';
import AddFolderError from '../AddFolderError/AddFolderError';
import AddNoteError from '../AddNoteError/AddNoteError';
import PageNotFound from '../PageNotFound/PageNotFound';
import './Main.css';


const Main = () => {
    return (
        <main>
            <Switch>
                <Route 
                    exact path="/"
                    render={rProps => (
                        <NotesError>
                            <NotesList {...rProps} />
                        </NotesError>
                    )}
                />
                <Route 
                    exact path="/note/:noteId"
                    render={rProps => (
                        <NotesError>
                            <Note {...rProps} />
                        </NotesError>
                    )}
                />
                <Route
                    exact path="/folder/:folderId"
                    render={rProps => (
                        <NotesError>
                            <Folder {...rProps} />
                        </NotesError>
                    )}
                />
                <Route
                    exact path="/add-folder"
                    render={rProps => (
                        <AddFolderError>
                            <AddFolder {...rProps} />
                        </AddFolderError>
                    )}
                />
                <Route 
                    exact path="/folder/:folderId/update-folder"
                    render={rProps => (
                        <AddFolderError>
                            <UpdateFolder {...rProps} />
                        </AddFolderError>
                    )}
                />
                <Route
                    exact path="/add-note"
                    render={rProps => (
                        <AddNoteError>
                            <AddNote {...rProps} />
                        </AddNoteError>
                    )}
                />
                <Route 
                    exact path="/note/:noteId/update-note"
                    render={rProps => (
                        <AddNoteError>
                            <UpdateNote {...rProps} />
                        </AddNoteError>
                    )}
                />
                <Route 
                    component={PageNotFound}
                />
            </Switch>
        </main>
    );
}

export default Main;