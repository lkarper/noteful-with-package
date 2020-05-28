import React from 'react';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';
import NotesContext from './NotesContext/NotesContext';
import './App.css';

class App extends React.Component {

  static contextType = NotesContext;

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
    fetch('http://localhost:9090/folders')
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
      
    fetch('http://localhost:9090/notes')
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
      folders: this.state.folders,
      notes: this.state.notes,
      folderError: this.state.folderError,
      noteError: this.state.noteError,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote,
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

export default App;
