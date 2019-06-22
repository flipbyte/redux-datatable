import _ from 'lodash';
import React, { useContext } from 'react';
import { SET_SELECTION } from '../../../actions';
import { getParam } from '../../../utils';
import { SELECT_ALL } from '../../../constants';
import { Field } from '../../../styled-components';
import ConfigContext from '../../../context';
import { useSelector } from 'react-redux';

const handleSelection = ({ data, primaryKey: paramKey, action }, event ) => {
    let key = getParam(paramKey, data);
    action(SET_SELECTION)({ paramKey, key, value: event.target.checked });
};

const isChecked = ( selection, selected ) => selection.all === true && selected !== false ? true : !!selected;

const Selection = ({
    action,
    data
}) => {
    const { getData, config: { primaryKey } } = useContext(ConfigContext);
    const selection = useSelector(getData(tableData => tableData.selection));
    const key = _.get(data, primaryKey);
    const value = isChecked(selection, _.get(selection.selected, [primaryKey, key]));
    return (
        <div className="col-12">
            <Field.Input
                type="checkbox"
                checked={ value }
                onChange={ handleSelection.bind(this, { data, primaryKey, action }) } />
        </div>
    );
};

export default Selection;
