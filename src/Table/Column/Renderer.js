import React from 'react';
import PropTypes from "prop-types";

import Text from './Renderer/Text';

const Renderer = (props) => {
    const TagName = props.renderer;
    return (<TagName index={ props.index } data={ props.data } />);
};

Renderer.propTypes = {
    index: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    renderer: PropTypes.func
};

Renderer.defaultProps = {
    renderer: Text
};

export default Renderer;
