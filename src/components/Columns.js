import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import withDropdown from '../hoc/withDropdown';
import { ADD_COLUMN, REMOVE_COLUMN } from '../constants';
import { Button, Dropdown } from '../styled-components';
import ConfigContext from '../context';

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

const updateColumns = (action, index, event) => {
    if (event.target.checked) {
        setVisibleColumnIds(updateState(ADD_COLUMN, index))
    } else {
        setVisibleColumnIds(updateState(REMOVE_COLUMN, index))
    }
};

const Columns = ({
    open,
    toggle,
    // columns,
    // visibleColumnIds,
    // setVisibleColumnIds,
    config: {
        styles = {}
    }
}) => {
    const {
        config: {
            components: {
                Table: { columns }
            }
        },
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
                            defaultChecked={ -1 !== visibleColumnIds.indexOf(index) }
                            onChange={(event) => updateColumns(action, index, event)}
                        />
                        <label htmlFor={ name }>{ label }</label>
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown.Container>
    );
};

// Columns.mapPropsToComponent = ({
//     config: {
//         components: {
//             Table: { columns }
//         }
//     },
//     columns: [ visibleColumnIds, setVisibleColumnIds ]
// }) => ({ columns, visibleColumnIds, setVisibleColumnIds });

export default withDropdown(Columns);
