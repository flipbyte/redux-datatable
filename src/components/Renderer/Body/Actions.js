import React, { Component } from 'react';
import { Button } from '../../../styled-components';
import { withData } from '../../../hoc';

const Actions = ({
    thunk,
    colConfig: { items },
    value
}) => (
    <div className="btn-group-sm">
        { items.map((item, index) => {
            const { thunk: cb, styles, label, icon, name, htmlClass } = item;
            return (
                <Button
                    key={ index }
                    className={ `rdt-body-actions button ${htmlClass || ''} ${name || ''}` }
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
