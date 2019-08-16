import _ from 'lodash';
import React, { useContext } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import ConfigContext from '../context';
import { createSelector } from 'reselect';
import { MODIFY_DATA } from '../actions';
import moment from 'moment';

const withData = WrappedComponent => (props) => {
    const { itemIndex, colConfig, primaryKey, schema } = props;
    const { selector, editable, name, parse = 'YYYY-MM-DD HH:mm:ss' } = colConfig;
    const { getData, thunk, action, config: { entity = {} } } = useContext(ConfigContext);
    const { selectors = {} } = entity;

    const isEditing = useSelector(getData(({ isEditing }) => !editable ? false : isEditing));
    const primarKeyValue = useSelector(getData(tableData => (
        !_.isEmpty(schema) ? tableData.items[itemIndex] : tableData.items[itemIndex][primaryKey]
    )));
    const modifiedValue = useSelector(getData(tableData => _.get(tableData.modified, [primarKeyValue, name])));

    const getItem = schema
        ? selector
            ? _.isFunction(selector)
                ? selector(primarKeyValue)
                : selectors[selector](primarKeyValue)
            : selectors.default(primarKeyValue)
        : getData(tableData => tableData.items[itemIndex]);

    const value = useSelector(createSelector(
        [ getItem ],
        (item) => _.get(item, name)
    ));

    const handleChange = (value) => {
        return (
            action(MODIFY_DATA)({
                pk: primaryKey,
                pkValue: primarKeyValue,
                key: name,
                value: moment(value).format(parse)
            })
        );
    }

    return (
        <WrappedComponent
            isEditing={ isEditing }
            origValue={ value }
            modifiedValue={ modifiedValue }
            value={ modifiedValue || value }
            isModified={ !!modifiedValue }
            handleChange={ handleChange }
            thunk={ thunk }
            action={ action }
            { ...props }
        />
    );
};

export default withData;
