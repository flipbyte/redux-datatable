import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { deleteData } from '../../../actions';
import { paramsResolver, prepareActionPayload, isUndefined } from '../../../utils';
import { Button } from '../../../styled-components';

const Actions = ({
    extra,
    thunk,
    colConfig: { items }
}) => (
    <div className="btn-group-sm">
        { items.map((item, index) => {
            const { thunk: cb, style, label, icon, name, htmlClass } = item;
            return (
                <Button
                    key={ index }
                    className={ `rdt-body-actions button ${htmlClass || ''} ${name || ''}` }
                    onClick={ cb && thunk.bind(this, cb, { item, extra }) }
                    { ...style }
                >
                    { !isUndefined(icon) && <i className={ icon } /> }
                    { !isUndefined(label) && label }
                </Button>
            );
        })}
    </div>
);

export default Actions;
