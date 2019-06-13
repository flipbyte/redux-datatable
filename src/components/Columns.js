import React, { useEffect } from 'react';
import withDropdown from '../hoc/withDropdown';
import { ADD_COLUMN, REMOVE_COLUMN } from '../constants';
import { Button, Dropdown } from '../styled-components';

const updateState = (type, index) => (state) => {
    let visibleColumnIds = [ ...state ];
    if (type === ADD_COLUMN) {
        visibleColumnIds.push(index);
        visibleColumnIds.sort();
    } else {
        visibleColumnIds.splice(visibleColumnIds.indexOf(index), 1).sort();
    }

    return visibleColumnIds;
}

const updateColumns = (setVisibleColumnIds, index, event) => {
    if (event.target.checked) {
        setVisibleColumnIds(updateState(ADD_COLUMN, index))
    } else {
        setVisibleColumnIds(updateState(REMOVE_COLUMN, index))
    }
};

const Columns = withDropdown(({
    open,
    toggle,
    columns,
    visibleColumnIds,
    setVisibleColumnIds,
    config: { style = {} }
}) => (
    <Dropdown.Container className="rdt-toolbar-columns">
        <Button  className="rdt-toolbar-btn" dropdownToggle onClick={ toggle } { ...style.button }>
            Columns
        </Button>
        <Dropdown.Menu className="rdt-toolbar-menu" hidden={ !open } { ...style.dropdownMenu }>
            { columns.map(({ name, label }, index) => (
                <Dropdown.Item key={ index } className="rdt-toolbar-item" padding="0.25rem 0.75rem">
                    <input name={ name }
                        type="checkbox"
                        style={{ margin: 5 }}
                        defaultChecked={ -1 !== visibleColumnIds.indexOf(index) }
                        onChange={(event) => updateColumns(setVisibleColumnIds, index, event)}
                    />
                    <label htmlFor={ name }>{ label }</label>
                </Dropdown.Item>
            ))}
        </Dropdown.Menu>
    </Dropdown.Container>
));

Columns.mapPropsToComponent = ({
    config: {
        components: { Table: columns }
    },
    columns: [ visibleColumnIds, setVisibleColumnIds ]
}) => ({ columns, visibleColumnIds, setVisibleColumnIds });

export default Columns;
