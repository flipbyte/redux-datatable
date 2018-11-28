import React from 'react';
import PropTypes from "prop-types";

import Text from './Renderer/Text';
import Date from './Renderer/Date';
import Actions from './Renderer/Actions';
import Options from './Renderer/Options';
import Selection from './Renderer/Selection';

const _render = ( ComponentName, props ) => <ComponentName { ...props } />

const Renderer = ({ index, data, renderer, colConfig }) => {
    var types = {
        date: Date,
        actions: Actions,
        selection: Selection,
        options:  Options,
        default: Text
    };

    return _render(
        renderer || types[colConfig.type] || types['default'],
        { index, data, colConfig }
    )
};

Renderer.propTypes = {
    index: PropTypes.string,
    data: PropTypes.object.isRequired,
    renderer: PropTypes.func,
    colConfig: PropTypes.object,
};

export default Renderer;
