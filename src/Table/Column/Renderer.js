import React from 'react';
import PropTypes from "prop-types";

import Text from './Renderer/Text';
import Date from './Renderer/Date';
import Actions from './Renderer/Actions';
import Selection from './Renderer/Selection';

const _render = (ComponentName, props) =>
    <ComponentName { ...props } />

const Renderer = ({ query, index, data, renderer, config, actions }) => {
    if(renderer) {
        return _render(renderer, {index, data, config, query, actions });
    } else {
        switch(config.type) {
            case 'date':
                return _render(Date, {index, data});

            case 'actions':
                return _render(Actions, {query, data, config, actions});

            case 'selection':
                return _render(Selection, {query, data, config});

            default:
                return _render(Text, {index, data});

        }
    }
};

Renderer.propTypes = {
    index: PropTypes.string,
    data: PropTypes.object.isRequired,
    renderer: PropTypes.func,
    config: PropTypes.object,
    actions: PropTypes.object,
};

export default Renderer;
