import _ from 'lodash';
import React from 'react';

import Limiter from './Renderer/Pagination/Limiter';
import Pages from './Renderer/Pagination/Pages';
import ResultCount from './Renderer/Pagination/ResultCount';

import Button from './Renderer/Toolbar/Button';
import Print from './Renderer/Toolbar/Print';
import Columns from './Renderer/Toolbar/Columns';
import MassActions from './Renderer/Toolbar/MassActions';
import ResetFilters from './Renderer/Toolbar/ResetFilters';
import EditableButtons from './Renderer/Toolbar/EditableButtons';

import DateFilter from './Renderer/Filter/Date';
import FilterOptions from './Renderer/Filter/Options';
import String from './Renderer/Filter/String';
import Number from './Renderer/Filter/Number';

import Text from './Renderer/Body/Text';
import Date from './Renderer/Body/Date';
import Image from './Renderer/Body/Image';
import Actions from './Renderer/Body/Actions';
import Options from './Renderer/Body/Options';
import Selection from './Renderer/Body/Selection';

import HeaderCol from './Renderer/Header/Column';
import SelectAll from './Renderer/Header/Selection';

import { COMPONENT } from './constants';

// const pack = ({ itemConfig, action }) => (Renderer, props = {}) => ({
//     Renderer,
//     { ...props, itemConfig, action }
// });

// const pack = (props) => (renderer) => renderer(props)

const renderers = {
    [COMPONENT.LIMITER]: ({ paginationProps }) => ({ Limiter, ...paginationProps }),
    [COMPONENT.PAGES]: ({ paginationProps }) => ({ Pages, ...paginationProps }),
    [COMPONENT.RESULT_COUNT]: ({ paginationProps }) => ({ ResultCount, ...paginationProps }),
    [COMPONENT.BUTTON]: ({ thunk, internalStateUpdater }) => ({ Button, props: { thunk, internalStateUpdater } }),
    [COMPONENT.PRINT]: ({ internalStateUpdater }, pack) => ({ Print, props: { internalStateUpdater } }),
    [COMPONENT.COLUMNS]: ({ columns, visibleColumns, internalStateUpdater }) => (
        { Columns, props: { columns, visibleColumns, internalStateUpdater } }
    ),
    [COMPONENT.RESULT_FILTERS]: (_, pack) => ({ ResetFilters }),
    [COMPONENT.EDITABLE]: ({ isModified, isEditing, internalStateUpdater, thunk }, pack) => (
        { EditableButtons, props: { isModified, isEditing, internalStateUpdater, thunk } }
    ),
    [COMPONENT.MASS_ACTIONS]: ({ thunk }, pack) => ({ MassActions, props: { thunk } }),
    [COMPONENT.TABLE]: (props) => (
        <Layout config={ config }>
            {(item, index) => {
                const { Renderer, props } = renderer(components)(props)(item);
                return <Renderer key={ index } { ...props } />;
            }}
        </Layout>
    ),
    [COMPONENT.TABLE_HEAD]: (props) => (
        <Layout config={ config }>
            {(item, index) => {
                const { Renderer, props } = renderer(components)(props)(item);
                return <Renderer key={ index } { ...props } />;
            }}
        </Layout>
    )
};

const render = (components) => ({ action, ...props }) => (item, index) => {
    var id = item;
    if (isObject(item)) {
        id = item.type;
    }

    if (!!id === false) {
        throw '"type" is a required field in layout item object';
    }

    const componentConfig = _.get(components, id, false);
    if (componentConfig !== false && !!componentConfig.renderer === true) {
        return componentConfig.renderer({ ...props, componentConfig });
    }

    if (!!renderer[type] === false) {
        throw `Component of type "${type}" is not defined`;
    }

    return renderers[type](props);
}

// const renderers = {
//     pagination: {
//         limiter: Limiter,
//         pages: Pages,
//         resultCount: ResultCount
//     },
//     toolbar: {
//         button: Button,
//         print: Print,
//         columns: Columns,
//         resetFilters: ResetFilters,
//         editable: EditableButtons,
//         default: MassActions,
//     },
//     filter: {
//         number: Number,
//         date: DateFilter,
//         options: FilterOptions,
//         default: String
//     },
//     body: {
//         date: Date,
//         actions: Actions,
//         selection: Selection,
//         options: Options,
//         image: Image,
//         default: Text
//     },
//     header: {
//         selection: SelectAll,
//         default: HeaderCol
//     }
// };
//
// const getRenderers = ( ofType ) => renderers[ofType] || {};
//
// const Renderer = ({ ofType, forItem, ...props }) => {
//     const renderers = getRenderers(ofType);
//     const Renderer = renderers[forItem] || renderers['default'];
//     return <Renderer { ...props } />;
// };

export default Renderer;
