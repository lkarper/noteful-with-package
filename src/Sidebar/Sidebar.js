import React from 'react';
import { Route } from 'react-router-dom';
import SidebarLinks from '../SidebarLinks/SidebarLinks';
import NotesSidebar from '../NotesSidebar/NotesSidebar';
import SidebarError from '../SidebarError/SidebarError';
import './Sidebar.css';

const Sidebar = () => {
    
    return (
        <SidebarError>
            <Route 
                exact path={["/", "/folder/:folderId", "/add-folder", "/add-note"]}
                component={SidebarLinks}
            />
            <Route 
                path={["/note/:noteId", "/update-note/:noteId"]}
                component={NotesSidebar}
            />    
        </SidebarError>
    );
}

export default Sidebar;