import React, { Component } from 'react';
import { Button } from '../../../styled-components';
import { withData } from '../../../hoc';

const Actions = ({
    thunk,
    colConfig: { items },
    value,
    className = 'btn-group-sm'
}) => (
    <div className={ className }>
        { items.map((item, index) => {
            const { thunk: cb, styles, label, icon, name, className = 'rdt-body-actions button' } = item;
            return (
                <Button
                    key={ index }
                    className={ className }
                    onClick={ cb && thunk.bind(this, cb, { item, value }) }
                    styles={ styles }
                >
                    { !!icon && <i className={ icon } /> }
                    { !!label && label }
                </Button>
            );
        })}
    </div>
);

export default withData(Actions);
