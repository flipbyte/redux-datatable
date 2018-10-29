import _ from 'lodash';
import React from 'react';
import PropTypes from "prop-types";
import MassActions from './Toolbar/MassActions';
import { withTableConfig } from '../TableProvider';

const _renderToolbarItem = ({ key, item }) => {
    if( item.renderer ) {
        let Renderer = item.renderer;
        return <Renderer key={ key} />;
    }

    return <MassActions key={ key } />
}

const Toolbar = ({ config: { toolbar } }) =>
    _.map(toolbar, ( item, key ) => _renderToolbarItem({ key, item }))

export default withTableConfig({
    toolbar: 'toolbar',
})(Toolbar);
