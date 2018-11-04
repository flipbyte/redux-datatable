import _ from 'lodash';
import React from 'react';
import PropTypes from "prop-types";
import MassActions from './Toolbar/MassActions';
import ResetFilters from './Toolbar/ResetFilters';
import { withTableConfig } from '../TableProvider';

const _renderToolbarItem = (key, item) => {
    if( item.renderer ) {
        let Renderer = item.renderer;
        return <Renderer key={ key } itemConfig={ item } />;
    }

    if(key == 'resetFilters' && item !== false)
        return <ResetFilters key={ key } itemConfig={ item } />

    return <MassActions key={ key } itemConfig={ item } />
}

const Toolbar = ({ config: { toolbar } }) =>
    _.map(toolbar, ( item, key ) =>
        <div className="btn-group" key={ key }>
            { _renderToolbarItem(key, item) }
        </div>
    );

export default withTableConfig({
    toolbar: 'toolbar',
})(Toolbar);
