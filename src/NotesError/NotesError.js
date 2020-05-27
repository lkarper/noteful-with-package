import React, { Component } from 'react';

class NotesError extends Component {
    state ={
        hasError: false,
    };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <h2>Cound not display notes.  Check your connection and try again.</h2>;
        }
        return this.props.children;
    }
}

export default NotesError;