import _ from 'lodash';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { SET_SELECTION } from '../../actions';
import { withTableConfig } from '../../TableProvider';
import { getParam, getConfigParam, prepareActionPayload } from '../../utils';
import { memoizedGetSelection } from '../../selectors';

const handleSelection = ({ data, indexField, action }, event ) => {
    let paramKey = getConfigParam(indexField);
    let key = getParam(indexField, data);
    action(SET_SELECTION)({ paramKey, key, value: event.target.checked });
};

const Selection = ({
    action,
    data,
    extraData: { selection },
    colConfig: { indexField }
}) => {
    const dataKey = getConfigParam(indexField);
    const key = _.get(data, dataKey);
    const value = _.get(selection, [dataKey, key], false);

    return (
        <div className="col-12">
            <input
                type="checkbox"
                checked={ value }
                onChange={ handleSelection.bind(this, { data, indexField, action }) } />
        </div>
    );
};

export default Selection;
