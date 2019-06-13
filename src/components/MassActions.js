import React from 'react';
import withDropdown from '../hoc/withDropdown';
import { Button, Dropdown } from '../styled-components';

const MassActions = withDropdown(({
    toggle,
    open,
    thunk,
    config: { label, name, options, style = {} },
}) => (
    <Dropdown.Container className={ `rdt-toolbar-mass-actions ${name || ''}` }>
        <Button className="rdt-toolbar-button" dropdownToggle onClick={ toggle } { ...style.button }>
            { label }
        </Button>
        <Dropdown.Menu className="rdt-toolbar-menu" hidden={ !open } { ...style.dropdownMenu }>
            { options.map(({ thunk: cb, ...option }, index) =>
                <Dropdown.Item className="rdt-toolbar-item" key={ index } onClick={ cb && thunk.bind(this, cb, { option }) }>
                    { option.label }
                </Dropdown.Item>
            )}
        </Dropdown.Menu>
    </Dropdown.Container>
));

MassActions.mapPropsToComponent = ({ thunk }) => ({ thunk });

export default MassActions;
