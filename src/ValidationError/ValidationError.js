import React from 'react';
import PropTypes from 'prop-types';

const ValidationError = (props) => {
    if (props.message) {
        return <div className="validation-error">{props.message}</div>;
    }
    return <></>;
}

ValidationError.defaultProps = {
    message: '',
}

ValidationError.propTypes = {
    message: PropTypes.string,
}

export default ValidationError;