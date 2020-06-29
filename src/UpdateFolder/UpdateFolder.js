import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotesContext from '../NotesContext/NotesContext';
import ValidationError from '../ValidationError/ValidationError';
import config from '../config';

class UpdateFolder extends Component {

    static contextType = NotesContext;

    static defaultProps = {
        match: {
            params: {
                folderId: '',
            }
        },
    }

    state = {
        folder: {
            name: '',
            touched: false,
        },
        error: null,
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.folder.name && this.context.folders.length && !this.state.folder.touched) {
            const folderName = this.context.folders.find(f => f.id === parseInt(this.props.match.params.folderId)).name;
            this.setState({
                folder: {
                    name: folderName,
                    touched: true,
                },
            });
        }
    }

    componentDidMount() {
        if (this.context.folders.length) {
            const folderName = this.context.folders.find(f => f.id === parseInt(this.props.match.params.folderId)).name;
            this.setState({
                folder: {
                    name: folderName,
                    touched: true,
                },
            });
        } 
        // else {
        //     fetch(`${config.API_URL}/folders/${this.props.match.params.folderId}`, {
        //         headers: {
        //           'Authorization': `Bearer ${config.API_KEY}`
        //         }
        //     })
        //         .then(response => {
        //             if (response.ok) {
        //                 return response.json();
        //             }
        //             throw new Error(response.message);
        //         })
        //         .then(folder => {
        //             this.setState({
        //                 folder: {
        //                     name: folder.name,
        //                     touched: true,
        //                 }
        //             });
        //         })
        //         .catch(error => {
        //           console.log(error);
        //           this.setState({ error: error.message });
        //         });
        // }
    }

    handleUpdate = (event) => {
        event.preventDefault();
        const folder = {
            name: this.state.folder.name,
        }

        fetch(`${config.API_URL}/folders/${this.props.match.params.folderId}`, {
            method: 'PATCH',
            body: JSON.stringify(folder),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error;
                    })
                }
            })
            .then(data => {
                this.context.updateFolders({...folder, id: parseInt(this.props.match.params.folderId)});
            })
            .catch(error => {
                console.log('error', error);
                this.setState({
                    error: error.message
                });
            })
    }

    updateFolderName = (name) => {
        this.setState({
            folder: {
                name,
                touched: true,
            },
        });
    }

    validateFolderName = () => {
        const name = this.state.folder.name.trim();
        if (name.length === 0) {
            return 'Name is required and must contain at least one character.';
        }
    }

    render() {
        const { error } = this.state;
        const errorHTML = (
            <div className="folder-error">
                <h2>Looks like something went wrong: {error}.</h2>
                <p>A new folder could not be created at this time.  Please try again later.</p>
            </div>
        );
        const nameError = this.validateFolderName();

        const oldName = this.context.folders.find(f => f.id === parseInt(this.props.match.params.folderId)) ? 
            this.context.folders.find(f => f.id === parseInt(this.props.match.params.folderId)).name 
            : null ;

        return (
            <div>
                {(!this.context.folders.length && !this.context.folderError) && <h2>Loading...</h2>}
                {this.context.folderError &&
                    <div className="folder-load-error">
                        <h2>Sorry, could not load folders from the server: {error}</h2>
                        <p>Check your network connection and reload the page.</p>
                    </div>  
                }
                {!!this.context.folders.length &&
                    <form onSubmit={e => this.handleUpdate(e)}>
                        <label htmlFor="folder-name">{`Enter a new name for the folder "${oldName}":`}</label>
                        <input 
                            type="text" 
                            id="folder-name" 
                            name="folder-name" 
                            onChange={e => this.updateFolderName(e.currentTarget.value)} 
                            value={this.state.folder.name}
                            required 
                        />
                        {this.state.folder.touched && <ValidationError message={nameError} />}
                        <button 
                            type="submit"
                            disabled={nameError ? true : false}
                        >
                            Update Folder
                        </button>
                    </form>
                }
                {error ?  errorHTML : ''}
            </div>
        );
    }
}

UpdateFolder.propTypes = {
    match: PropTypes.object.isRequired,
}

export default UpdateFolder;