import React from 'react';
import { SET_SELECTION } from '../../../actions';
import { SELECT_ALL } from '../../../constants';
import { getConfigParam } from '../../../utils';
import { Field } from '../../../styled-components';

const handleSelection = ( selector, indexField, event ) => {
    let paramKey = getConfigParam(indexField);
    if (!paramKey) {
        return false;
    }

    selector({ paramKey, type: SELECT_ALL, value: event.target.checked });
};

const Selection = ({ name, action, indexField }) => (
    <Field.Input
        type="checkbox"
        name={ name }
        onChange={(event) => handleSelection(action(SET_SELECTION), indexField, event)}
    />
);

export default Selection;
