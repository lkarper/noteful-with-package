import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';
import NotesContext from './NotesContext/NotesContext';
import config from './config';
import './App.css';

class App extends React.Component {

  state = {
    folders: [],
    notes: [],
    folderError: null,
    noteError: null,
  }

  deleteNote = (noteId) => {
    const newNotes = this.state.notes.filter(n => n.id !== noteId);
    this.setState({
      notes: newNotes,
    });
  }

  deleteFolder = (folderId) => {
    const newFolders = this.state.folders.filter(f => f.id !== folderId);
    const newNotes = this.state.notes.filter(n => n.folder !== folderId);
    this.setState({
      folders: newFolders,
      notes: newNotes,
    });
  }

  updateNotes = (newNote) => {
    const newNotes = [...this.state.notes.filter(n => n.id !== newNote.id), newNote];
    this.setState({
      notes: newNotes,
    });
  }

  updateFolders =(newFolder) => {
    const newFolders = [...this.state.folders.filter(f => f.id !== newFolder.id), newFolder];
    this.setState({
      folders: newFolders
    }, () => this.props.history.push(`/folder/${newFolder.id}`));
  }

  addFolder = (folder) => {
    this.setState({
      folders: [...this.state.folders, folder],
    });
  }

  addNote = (note) => {
    this.setState({
      notes: [...this.state.notes, note],
    });
  }

  componentDidMount() {
    fetch(`${config.API_URL}/folders`, {
      headers: {
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.message);
      })
      .then(folders => {
        this.setState({
          folders,
          folderError: null,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ folderError: error.message });
      });
      
    fetch(`${config.API_URL}/notes`, {
      headers: {
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.message);
      })
      .then(notes => {
        this.setState({
          notes,
          noteError: null,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ noteError: error.message });
      });

  }

  render() { 
    const contextValue = {
      folders: this.state.folders.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        }
        return 0;
      }),
      notes: this.state.notes,
      folderError: this.state.folderError,
      noteError: this.state.noteError,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote,
      deleteFolder: this.deleteFolder,
      updateNotes: this.updateNotes,
      updateFolders: this.updateFolders,
    };

    return (
      <NotesContext.Provider
        value={contextValue}
      >
        <div className="App">
          <Header />
          <div className="content">
            <Sidebar />
            <Main />
          </div>
        </div>
      </NotesContext.Provider>
    );
  }
}

export default withRouter(App);
