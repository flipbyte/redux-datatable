import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import withDropdown from '../hoc/withDropdown';
import { ADD_COLUMN, REMOVE_COLUMN } from '../constants';
import { Button, Dropdown } from '../styled-components';
import ConfigContext from '../context';
import { SET_VISIBLE_COLUMN_IDS } from '../actions';

const updateState = (type, index, state) => {
    let visibleColumnIds = [ ...state ];
    if (type === ADD_COLUMN) {
        visibleColumnIds.push(index);
        visibleColumnIds.sort();
    } else {
        visibleColumnIds.splice(visibleColumnIds.indexOf(index), 1).sort();
    }

    return visibleColumnIds;
}

const updateColumns = (action, index, visibleColumnIds, event) => {
    if (event.target.checked) {
        action(SET_VISIBLE_COLUMN_IDS)(updateState(ADD_COLUMN, index, visibleColumnIds));
    } else {
        action(SET_VISIBLE_COLUMN_IDS)(updateState(REMOVE_COLUMN, index, visibleColumnIds));
    }
};

const Columns = ({
    open,
    toggle,
    config: {
        styles = {}
    }
}) => {
    const {
        columns,
        action,
        getData
    } = useContext(ConfigContext);
    const visibleColumnIds = useSelector(getData(({ visibleColumnIds  }) => visibleColumnIds)) || [];
    return (
        <Dropdown.Container className="rdt-toolbar-columns">
            <Button  className="rdt-toolbar-btn" dropdownToggle onClick={ toggle } styles={ styles.button }>
                Columns
            </Button>
            <Dropdown.Menu className="rdt-toolbar-menu" hidden={ !open }  styles={ styles.dropdownMenu }>
                { columns.map(({ name, label }, index) => (
                    <Dropdown.Item
                        key={ index }
                        className="rdt-toolbar-item"
                        padding="0.25rem 0.75rem"
                        styles={ styles.dropdownItem }
                    >
                        <input name={ name }
                            type="checkbox"
                            style={{ margin: 5 }}
                            checked={ -1 !== visibleColumnIds.indexOf(index) }
                            onChange={(event) => action(SET_VISIBLE_COLUMN_IDS)({ index, checked: event.target.checked})}
                        />
                        <label htmlFor={ name }>{ label }</label>
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown.Container>
    );
};

export default withDropdown(Columns);
