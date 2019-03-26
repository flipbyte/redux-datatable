import _ from 'lodash';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { SET_SELECTION } from '../../../actions';
import { withTableConfig } from '../../../TableProvider';
import { getParam, getConfigParam, prepareActionPayload } from '../../../utils';
import { memoizedGetSelection } from '../../../selectors';

const handleSelection = ({ data, colConfig, action }, event ) => {
    let paramKey = getConfigParam(colConfig.indexField);
    let key = getParam(colConfig.indexField, data);
    action(SET_SELECTION)({ paramKey, key, value: event.target.checked });
}

const Selection = ( props ) => {
    const {
        data,
        extraData: { selection },
        colConfig: { indexField }
    } = props;
    const dataKey = getConfigParam(indexField);
    const key = _.get(data, dataKey);
    const value = _.get(selection, [dataKey, key], false);

    return (
        <div className="col-12">
            <input
                type="checkbox"
                checked={ value }
                onChange={ handleSelection.bind(this, props) } />
        </div>
    );
}

export default Selection;
