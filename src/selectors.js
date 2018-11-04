// import { createSelector } from 'reselect'
import _ from 'lodash';

const SELECTION_KEY = 'selection';

export const getTables = ( state ) => state;

// export const getTableData = createSelector(
//     [ getTables ],
//     ( tables ) => memoize(
//         ( reducerName ) => memoize(
//             ( name ) => get(tables, [reducerName, name], {})
//         )
//     )
// );


// export const getSelection = createSelector(
//     [ getTables ],
//     ( tables ) => memoize(
//         ( reducerName, name )
//     )
// )

const getSelection = ( path, selections ) => _.get(selections, path, false);
export const memoizedGetSelection = _.memoize(getSelection);
