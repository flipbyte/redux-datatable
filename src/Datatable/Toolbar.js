import React from 'react';
import PropTypes from "prop-types";
import MassActions from './Toolbar/MassActions';
import ResetFilters from './Toolbar/ResetFilters';
import Columns from './Toolbar/Columns';
import Styles from './Styles'

const getRenderer = ( type ) => {
    const renderers = {
        'reset-filters': ResetFilters,
        'columns': Columns,
        'default': MassActions
    }

    return (renderers[type] || renderers['default']);
}

export const ToolbarItem = ({ item }) => {
    const { style, ...rest } = item;
    const Renderer = getRenderer(item.type);
    return (
        <Styles.ToolbarItem { ...style }>
            <Renderer itemConfig={ rest } />
        </Styles.ToolbarItem>
    );
}

export const ToolbarRow = ({ items }) =>
    <Styles.ToolbarRow>
        { items.map((item, index) =>
            <ToolbarItem key={ index } item={ item } />
        )}
    </Styles.ToolbarRow>

const Toolbar = ({ children }) =>
    <Styles.Toolbar>{ children }</Styles.Toolbar>

export default Toolbar;
