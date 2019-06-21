import React, { Component } from 'react';
import { isUndefined } from '../../../utils';
import { Button } from '../../../styled-components';

const Actions = ({
    extra,
    thunk,
    colConfig: { items }
}) => (
    <div className="btn-group-sm">
        { items.map((item, index) => {
            const { thunk: cb, styles, label, icon, name, htmlClass } = item;
            return (
                <Button
                    key={ index }
                    className={ `rdt-body-actions button ${htmlClass || ''} ${name || ''}` }
                    onClick={ cb && thunk.bind(this, cb, { item, extra }) }
                    styles={ styles }
                >
                    { !isUndefined(icon) && <i className={ icon } /> }
                    { !isUndefined(label) && label }
                </Button>
            );
        })}
    </div>
);

export default Actions;
