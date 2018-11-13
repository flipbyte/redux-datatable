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

const renderToolbarGroup = ( groupKey, { htmlClass, ...items } ) =>
    <div key={ groupKey } className={ 'btn-group ' + htmlClass }>
        { _.map(items, (item, key) => _renderToolbarItem(key, item)) }
    </div>

const Toolbar = ({ config: { toolbar } }) =>
    <div className="btn-toolbar">
        { _.map(toolbar, (group, key) => renderToolbarGroup(key, group)) }
    </div>

export default withTableConfig({
    toolbar: 'toolbar',
})(Toolbar);
