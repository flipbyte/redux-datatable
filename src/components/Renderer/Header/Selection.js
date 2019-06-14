import _ from 'lodash';
import React from 'react';
import { SET_SELECTION } from '../../../actions';
import { SELECT_ALL } from '../../../constants';
import { Field } from '../../../styled-components';

const handleSelection = ( selector, primaryKey, event ) => {
    if (!primaryKey) {
        return false;
    }

    selector({ primaryKey, type: SELECT_ALL, value: event.target.checked });
};

const isIndeterminate = (selection, primaryKey) => {
    const values = _.values(_.get(selection.selected, primaryKey, {}));
    return values.includes(true) || (selection.all === true && values.includes(false));
};

const Selection = ({ name, action, selection = {}, primaryKey }) => (
    <Field.Input
        type="checkbox"
        name={ name }
        checked={ selection.all === true && _.isEmpty(selection.selected) }
        onChange={(event) => handleSelection(action(SET_SELECTION), primaryKey, event)}
        ref={(el) => el && (el.indeterminate = isIndeterminate(selection, primaryKey))}
    />
);

export default Selection;
