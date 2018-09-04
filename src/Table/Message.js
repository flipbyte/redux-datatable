import React from 'react';
import PropTypes from "prop-types";

const Message = ({ message }) =>
    <div className={ 'alert alert-' + message.type }>
        { message.message }
    </div>

Message.propTypes = {
    message: PropTypes.object.isRequired,
};

export default Message;
