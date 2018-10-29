import { createSelector } from 'reselect'
import get from 'lodash/get';
import memoize from 'lodash.memoize';

export const getTables = ( state ) => state;

export const getTableData = createSelector(
    [ getTables ],
    ( tables ) => memoize(
        ( reducerName ) => memoize(
            ( name ) => get(tables, [reducerName, name], {})
        )
    )
);
