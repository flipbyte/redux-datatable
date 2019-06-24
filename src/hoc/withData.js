import _ from 'lodash';
import React, { useContext } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import ConfigContext from '../context';
import { createSelector } from 'reselect';

const withData = WrappedComponent => (props) => {
    const { itemIndex, colConfig, primaryKey, schema } = props;
    const { selector, editable, name } = colConfig;
    const {
        getData,
        thunk,
        config: { entity = {} }
    } = useContext(ConfigContext);
    const { selectors = {} } = entity;

    const isEditing = useSelector(getData(({ isEditing }) => !!editable ? false : isEditing));
    const primarKeyValue = useSelector(getData(tableData => (
        !_.isEmpty(schema) ? tableData.items[itemIndex] : _.get(tableData.items[itemIndex], primaryKey)
    )));
    const modifiedValue = useSelector(getData(tableData => _.get(tableData.modified, [primarKeyValue, name])));

    const getItem = schema
        ? selector
            ? selectors[selector](itemIndex)
            : selectors.default(itemIndex)
        : getData(tableData => tableData.items[itemIndex]);

    const value = useSelector(createSelector(
        [ getItem ],
        (item) => {
            console.log(item);
            return _.get(item, name);
        }
    ));

    console.log('value', value);

    const handleChange = (event) => (
        action(MODIFY_DATA)({
            pk: primaryKey,
            pkValue: primarKeyValue,
            key: event.target.name,
            value: event.target.value
        })
    );

    return (
        <WrappedComponent
            isEditing={ isEditing }
            origValue={ value }
            modifiedValue={ modifiedValue }
            value={ modifiedValue || value }
            isModified={ !!modifiedValue }
            handleChange={ handleChange }
            thunk={ thunk }
            { ...props }
        />
    );
}

export default withData;
