import React from 'react';
import PropTypes from "prop-types";

import Text from './Renderer/Text';
import Date from './Renderer/Date';
import Actions from './Renderer/Actions';

const _render = (ComponentName, props) =>
    <ComponentName { ...props } />

const Renderer = ({ name, url, query, index, data, renderer, config, deleter }) => {
    if(renderer) {
        return _render(renderer, {index, data, config, name, url, query, deleter });
    } else {
        switch(config.type) {
            case 'date':
                return _render(Date, {index, data});

            case 'actions':
                return _render(Actions, {name, url, query, data, config, deleter});

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

export default Renderer;
