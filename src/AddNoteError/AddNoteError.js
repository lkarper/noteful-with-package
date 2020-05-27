import React, { Component } from 'react';


class AddNoteError extends Component {
    state ={
        hasError: false,
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <h2>Could not add note.  Check your connection and try again.</h2>
        }
        
        return this.props.children;
    }
}

export default AddNoteError;