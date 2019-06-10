import _ from 'lodash';
import React from 'react';
import { SET_SELECTION } from '../../actions';
import { getParam, getConfigParam } from '../../utils';
import { SELECT_ALL } from '../../constants';
import Field from '../../styled-components/Field';

const handleSelection = ({ data, indexField, action }, event ) => {
    let paramKey = getConfigParam(indexField);
    let key = getParam(indexField, data);
    action(SET_SELECTION)({ paramKey, key, value: event.target.checked });
};

const isChecked = ( selection, selected ) => selection.all === true && selected !== false ? true : !!selected;

const Selection = ({
    action,
    data,
    extraData: { selection },
    colConfig: { indexField }
}) => {
    const dataKey = getConfigParam(indexField);
    const key = _.get(data, dataKey);
    const value = isChecked(selection, _.get(selection.selected, [dataKey, key]));
    return (
        <div className="col-12">
            <Field.Input
                type="checkbox"
                checked={ value }
                onChange={ handleSelection.bind(this, { data, indexField, action }) } />
        </div>
    );
};

export default Selection;
