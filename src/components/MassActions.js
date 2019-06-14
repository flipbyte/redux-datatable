import React from 'react';
import withDropdown from '../hoc/withDropdown';
import { Button, Dropdown } from '../styled-components';

const MassActions = withDropdown(({
    toggle,
    open,
    thunk,
    config: { label, name, options, styles = {} },
}) => (
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
));

MassActions.mapPropsToComponent = ({ thunk }) => ({ thunk });

export default MassActions;
