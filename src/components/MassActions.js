import React, { useContext } from 'react';
import { withDropdown } from '../hoc';
import { Button, Dropdown } from '../styled-components';
import ConfigContext from '../context';

const MassActions = React.forwardRef(({
    toggle,
    open,
    config: {
        label,
        name,
        options,
        styles = {},
        className = 'rdt-toolbar-mass-actions',
        btnClassName = 'rdt-toolbar-button',
        menuClassName = 'rdt-toolbar-menu',
        menuItemClassName = 'rdt-toolbar-item',
        activeClassName = 'show'
    },
}, ref) => {
    const { thunk } = useContext(ConfigContext);
    return (
        <Dropdown.Container ref={ ref } className={ className }>
            <Button className={ btnClassName } dropdownToggle onClick={ toggle } styles={ styles.button }>
                { label }
            </Button>
            <Dropdown.Menu
                className={ `${menuClassName} ${open ? activeClassName : ''}` }
                hidden={ !open }
                styles={ styles.dropdownMenu }
            >
                { options.map(({ role = '', thunk: cb, ...option, styles: itemStyles }, index) =>
                    <Dropdown.Item
                        className={ menuItemClassName }
                        key={ index }
                        onClick={ cb && thunk.bind(this, cb, { option }) }
                        styles={ itemStyles || styles.dropdownItem }
                        role={ role }
                    >
                        { option.label }
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown.Container>
    );
});

export default withDropdown(MassActions);
