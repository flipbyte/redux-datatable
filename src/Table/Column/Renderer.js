import React from 'react';
import PropTypes from "prop-types";

import Text from './Renderer/Text';
import Date from './Renderer/Date';
import Actions from './Renderer/Actions';
import Options from './Renderer/Options';
import Selection from './Renderer/Selection';

const _render = (ComponentName, props) =>
    <ComponentName { ...props } />

const Renderer = ({ index, data, renderer, colConfig }) => {
    if(renderer) {
        return _render(renderer, {index, data, colConfig });
    } else {
        switch(colConfig.type) {
            case 'date':
                return _render(Date, { index, data, colConfig });

            case 'actions':
                return _render(Actions, { data, colConfig });

            case 'selection':
                return _render(Selection, { data, colConfig });

            case 'options':
                return _render(Options, { index, data, colConfig });

            default:
                return _render(Text, { index, data, colConfig });

        }
    }
};

Renderer.propTypes = {
    index: PropTypes.string,
    data: PropTypes.object.isRequired,
    renderer: PropTypes.func,
    colConfig: PropTypes.object,
};

export default Renderer;
