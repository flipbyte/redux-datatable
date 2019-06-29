import React, { useContext } from 'react';
import { withDropdown } from '../hoc';
import { Button, Dropdown } from '../styled-components';
import ConfigContext from '../context';

const MassActions = ({
    toggle,
    open,
    config: { label, name, options, styles = {} },
}) => {
    const { thunk } = useContext(ConfigContext);
    return (
        <Dropdown.Container className={ `rdt-toolbar-mass-actions ${name || ''}` }>
            <Button className="rdt-toolbar-button" dropdownToggle onClick={ toggle } styles={ styles.button }>
                { label }
            </Button>
            <Dropdown.Menu className="rdt-toolbar-menu" hidden={ !open } styles={ styles.dropdownMenu }>
                { options.map(({ thunk: cb, ...option, styles: itemStyles }, index) =>
                    <Dropdown.Item
                        className="rdt-toolbar-item"
                        key={ index }
                        onClick={ cb && thunk.bind(this, cb, { option }) }
                        styles={ itemStyles || styles.dropdownItem }
                    >
                        { option.label }
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown.Container>
    );
};

export default withDropdown(MassActions);
