import React from 'react';

const NotesContext = React.createContext({
    folders: [],
    notes: [],
    folderError: null,
    noteError: null,
    deleteNote: () => {},
    addFolder: () => {},
    addNote: () => {},
    deleteFolder: () => {},
    updateNotes: () => {},
    updateFolders: () => {},
});

export default NotesContext;