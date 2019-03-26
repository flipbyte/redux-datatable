import React from 'react';
import PropTypes from "prop-types";
import MassActions from './Toolbar/MassActions';
import ResetFilters from './Toolbar/ResetFilters';
import Columns from './Toolbar/Columns';
import Styles from './Styles'

const renderers = {
    'reset-filters': ResetFilters,
    'columns': Columns,
    'default': MassActions
}

const getRenderer = ( type ) => renderers[type] || renderers['default']
export const toolbarItem = ( render, item, index ) => {
    const { style, type } = item;
    return (
        <Styles.ToolbarItem key={ index } { ...style }>
            { render(getRenderer(item.type), item, index)  }
        </Styles.ToolbarItem>
    );
}

const Toolbar = ({ items, render }) =>
    <Styles.Toolbar>
        { items.map((row, rowIndex) =>
            <Styles.ToolbarRow key={ rowIndex }>
                { row.map((item, itemIndex) => toolbarItem(render, item, itemIndex) )}
            </Styles.ToolbarRow>
        )}
    </Styles.Toolbar>

export default Toolbar;
