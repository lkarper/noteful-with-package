import React from 'react';
import { NavLink } from 'react-router-dom';
import NotesContext from '../NotesContext/NotesContext';

const SidebarLinks = () => {

    return (
        <NotesContext.Consumer>
            {value => {
                const error = value.folderError;
                const errorHTML = (
                    <div className="folder-load-error">
                        <h2>Sorry, could not load folders from the server: {error}</h2>
                        <p>Check your network connection and reload the page.</p>
                    </div>
                );

                const links = value.folders.map(folder =>
                    <NavLink
                        key={folder.id}
                        className='folder-link'
                        activeClassName="highlighted"
                        to={`/folder/${folder.id}`}
                    >
                        {folder.name}
                    </NavLink>
                );

                return (
                    <nav className="sidebar">
                        {links}
                        {error ? errorHTML : ''}
                        <NavLink
                            className='folder-link'
                            activeClassName='highlighted'
                            to={'/add-folder'}
                        >
                            Add folder
                        </NavLink>
                    </nav>
                )
            }}
        </NotesContext.Consumer>
    );
}

export default SidebarLinks;