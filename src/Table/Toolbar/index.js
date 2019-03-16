import _ from 'lodash';
import React from 'react';
import PropTypes from "prop-types";
import MassActions from './MassActions';
import ResetFilters from './ResetFilters';
import { withTableConfig } from '../../TableProvider';

const renderToolbarItem = (key, item) => {
    if( item.renderer ) {
        let Renderer = item.renderer;
        return <Renderer key={ key } itemConfig={ item } />;
    }

    if(key == 'resetFilters' && item !== false)
        return <ResetFilters key={ key } itemConfig={ item } />

    return <MassActions key={ key } itemConfig={ item } />
}

const Toolbar = ({ config: { toolbar } }) =>
    <div className="btn-toolbar">
        { _.map(toolbar, (item, key) => renderToolbarItem(key, item)) }
    </div>

export default withTableConfig({ toolbar: 'toolbar' })(Toolbar);
