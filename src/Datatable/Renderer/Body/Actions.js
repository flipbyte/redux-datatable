import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { deleteData } from '../../../actions';
import { withTableConfig } from '../../../TableProvider';
import { paramsResolver, prepareActionPayload } from '../../../utils'
import { Button } from 'styled-button-component';

const Actions = ({
    extra,
    thunk,
    colConfig: { items }
}) => (
    <div className="btn-group-sm">
        { items.map(({ thunk: cb, ...item }, index) =>
            <Button
                key={ index }
                noRadius
                sm
                onClick={ cb && thunk.bind(this, cb, { item, extra }) }
            >
                { item.label }
            </Button>
        )}
    </div>
);

export default Actions;
