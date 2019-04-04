import React from 'react';

import Limiter from './Renderer/Pagination/Limiter';
import Pages from './Renderer/Pagination/Pages';
import ResultCount from './Renderer/Pagination/ResultCount';

import Columns from './Renderer/Toolbar/Columns';
import MassActions from './Renderer/Toolbar/MassActions';
import ResetFilters from './Renderer/Toolbar/ResetFilters';

import DateFilter from './Renderer/Filter/Date';
import String from './Renderer/Filter/String';
import Number from './Renderer/Filter/Number';

import Text from './Renderer/Body/Text';
import Date from './Renderer/Body/Date';
import Image from './Renderer/Body/Image';
import Actions from './Renderer/Body/Actions';
import Options from './Renderer/Body/Options';
import Selection from './Renderer/Body/Selection';

const renderers = {
    pagination: {
        limiter: Limiter,
        pages: Pages,
        resultCount: ResultCount
    },
    toolbar: {
        columns: Columns,
        resetFilters: ResetFilters,
        default: MassActions,
    },
    filter: {
        number: Number,
        date: DateFilter,
        default: String
    },
    body: {
        date: Date,
        actions: Actions,
        selection: Selection,
        options: Options,
        image: Image,
        default: Text
    }
};

const getRenderers = ( ofType ) => renderers[ofType] || {};

const Renderer = ({ ofType, forItem, ...props }) => {
    const renderers = getRenderers(ofType);
    const Renderer = renderers[forItem] || renderers['default'];
    return <Renderer { ...props } />
}

export default Renderer;
