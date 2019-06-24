import _ from 'lodash';
import React, { useContext } from 'react';
import { SET_SELECTION } from '../../../actions';
import { Field } from '../../../styled-components';
import ConfigContext from '../../../context';
import { useSelector } from 'react-redux';
import withData from '../../../hoc/withData';

const handleSelection = ({ key, primaryKey, action }, event ) => {
    action(SET_SELECTION)({ paramKey: primaryKey, key, value: event.target.checked });
};

const isChecked = ( selection, selected ) => selection.all === true && selected !== false ? true : !!selected;

const Selection = ({
    action,
    value: key
}) => {
    const { getData, config: { primaryKey } } = useContext(ConfigContext);
    const checked = useSelector(getData(({ selection }) => {
        isChecked(selection, _.get(selection.selected, [primaryKey, key]))
    }));
    return (
        <div className="col-12">
            <Field.Input
                type="checkbox"
                checked={ checked }
                onChange={ handleSelection.bind(this, { key, primaryKey, action }) } />
        </div>
    );
};

export default withData(Selection);
