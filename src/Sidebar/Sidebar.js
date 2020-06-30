import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SidebarLinks from '../SidebarLinks/SidebarLinks';
import NotesSidebar from '../NotesSidebar/NotesSidebar';
import SidebarError from '../SidebarError/SidebarError';
import './Sidebar.css';

const Sidebar = () => {
    
    return (
        <SidebarError>
            <Switch>
                <Route 
                    exact path={["/note/:noteId", "/note/:noteId/update-note"]}
                    component={NotesSidebar}
                />    
                <Route
                    path={["/", "/folder/:folderId", "/add-folder", "/add-note", "/folder/:folderId/update-folder"]}
                    component={SidebarLinks}
                />
                </Switch>
        </SidebarError>
    );
}

export default Sidebar;