import React from 'react';
import PropTypes from "prop-types";

import MassActions from './Toolbar/MassActions';

const _renderToolbarItem = ( props ) => {
    if( props.key == 'massActions' ) return <MassActions { ...props } />

    return null;
}

const Toolbar = ({ data, query, config, massActions }) =>
    Object.keys(config).map( (key) =>
        _renderToolbarItem({ key, data, query, config: config[key], massActions })
    );

Toolbar.propTypes = {
    data: PropTypes.object.isRequired,
    query: PropTypes.object,
    config: PropTypes.object.isRequired,
};

Toolbar.defaultProps = {
    data: {}
}

export default Toolbar;
