import React, { Component } from 'react';

class SidebarError extends Component {
    state ={
        hasError: false,
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <h2>Sorry, could not load folders at this time.</h2>
        }
        return this.props.children;
    }
}

export default SidebarError;