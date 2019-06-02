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

const renderers = {
    pagination: {
        limiter: Limiter,
        pages: Pages,
        resultCount: ResultCount
    },
    toolbar: {
        button: Button,
        print: Print,
        columns: Columns,
        resetFilters: ResetFilters,
        editable: EditableButtons,
        default: MassActions,
    },
    filter: {
        number: Number,
        date: DateFilter,
        options: FilterOptions,
        default: String
    },
    body: {
        date: Date,
        actions: Actions,
        selection: Selection,
        options: Options,
        image: Image,
        default: Text
    },
    header: {
        selection: SelectAll,
        default: HeaderCol
    }
};

const getRenderers = ( ofType ) => renderers[ofType] || {};

const Renderer = ({ ofType, forItem, ...props }) => {
    const renderers = getRenderers(ofType);
    const Renderer = renderers[forItem] || renderers['default'];
    return <Renderer { ...props } />;
};

export default Renderer;
