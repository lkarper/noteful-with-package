import React from 'react';

const PageNotFound = (props) => {
    return (
        <div className="PageNotFound__container">
            <h2>Page not found</h2>
            <p>Sorry, but we could not find the page you were looking for. Check your query for typos and try again.</p>
            <button onClick={() => props.history.push('/')}>Go to homepage</button>
        </div>
    )
}

export default PageNotFound;