import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { withDropdown } from '../hoc';
import { Button, Dropdown } from '../styled-components';
import ConfigContext from '../context';
import { SET_VISIBLE_COLUMN_IDS } from '../actions';

const Columns = React.forwardRef(({
    open,
    toggle,
    config: {
        styles = {},
        className = 'rdt-toolbar-columns',
        btnClassName = 'rdt-toolbar-button',
        menuClassName = 'rdt-toolbar-menu',
        menuItemClassName = 'rdt-toolbar-item',
        activeClassName = 'show'
    }
}, ref) => {
    const { columns, action, getData } = useContext(ConfigContext);
    const visibleColumnIds = useSelector(getData(({ visibleColumnIds  }) => visibleColumnIds)) || [];
    return (
        <Dropdown.Container ref={ ref } className={ className }>
            <Button  className={ btnClassName } dropdownToggle onClick={ toggle } styles={ styles.button }>
                Columns
            </Button>
            <Dropdown.Menu
                className={ `${menuClassName} ${open ? activeClassName : ''}` }
                hidden={ !open }
                styles={ styles.dropdownMenu }
            >
                { columns.map(({ name, label, width }, index) => (
                    <Dropdown.Item
                        key={ index }
                        className={ menuItemClassName }
                        padding="0.25rem 0.75rem"
                        styles={ styles.dropdownItem }
                        onClick={(event) => {
                            action(SET_VISIBLE_COLUMN_IDS)({ index, checked: !event.target.firstChild.checked, width })
                        }}
                    >
                        <input
                            name={ name }
                            type="checkbox"
                            style={{ margin: 5 }}
                            checked={ -1 !== visibleColumnIds.indexOf(index) }
                            onClick={(event) => event.stopPropagation()}
                            onChange={(event) => {
                                action(SET_VISIBLE_COLUMN_IDS)({ index, checked: event.target.checked, width })
                            }}
                        />
                        { label }
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown.Container>
    );
});

export default withDropdown(Columns);
