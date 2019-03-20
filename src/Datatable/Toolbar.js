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

export const ToolbarItem = ({ config, item, action }) => {
    const { style, type } = item;
    const Renderer = getRenderer(type);
    return (
        <Styles.ToolbarItem { ...style }>
            <Renderer config={ config } itemConfig={ item } action={ action } />
        </Styles.ToolbarItem>
    );
}

const Toolbar = ({ items, render }) =>
    <Styles.Toolbar>
        { items.map((row, rowIndex) =>
            <Styles.ToolbarRow key={ rowIndex }>
                { row.map((item, itemIndex) => render(item, itemIndex) )}
            </Styles.ToolbarRow>
        )}
    </Styles.Toolbar>

export default Toolbar;
