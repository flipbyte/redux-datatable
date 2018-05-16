import React from 'react';
import PropTypes from "prop-types";

import Text from './Renderer/Text';
import Date from './Renderer/Date';
import Actions from './Renderer/Actions';

const _render = (ComponentName, props) =>
    <ComponentName { ...props } />

const Renderer = ({ index, data, renderer, config }) => {
    if(renderer) {
        return _render(renderer, {index, data, config });
    } else {
        switch(config.type) {
            case 'date':
                return _render(Date, {index, data});

            case 'actions':
                return _render(Actions, {data, config});

            default:
                return _render(Text, {index, data});

        }
    }
};

Renderer.propTypes = {
    index: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    renderer: PropTypes.func,
    config: PropTypes.object
};

Renderer.defaultProps = {
    renderer: Text
};

export default Renderer;
