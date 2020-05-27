import React from 'react';

const NotesContext = React.createContext({
    folders: [],
    notes: [],
    folderError: null,
    noteError: null,
    deleteNote: () => {},
    addFolder: () => {},
    addNote: () => {},
});

export default NotesContext;