import React from 'react';

const Header = ({ label, sortable, sorter, sort, dir }) =>
    sortable ?
        <Styles.Sortable
            isSorted={ colName === sort }
            dir={ dir }
            width={ width }
            onClick={ changeSortOrder.bind(this, query, colName, sorter)}
        >
            { label }
        </Styles.Sortable> :
        <Styles.TableCell header>{ label }</Styles.TableCell>

export const SEARCH_OPERATOR_IS = 'is';
export const SEARCH_OPERATOR_IN = 'in';
export const SEARCH_TYPE_DATE = 'date';
export const SEARCH_OPERATOR_NOT_IN = 'not in';
export const SEARCH_OPERATOR_BETWEEN = 'between';
export const SEARCH_OPERATOR_CONTAINS = 'contains';

const Filterer = ( props ) => {
    if( props.type == 'number') return <Number { ...props } />
    if( props.type == 'string') return <String { ...props } />
    if( props.type == 'date') return <Date { ...props } />
    return <String { ...props } />
}

const Filter = ({ filterable, ...rest }) =>
    <Styles.TableCell filter>
        { filterable && <Filterer { ...rest } />}
    </Styles.TableCell>

const getRenderer = ( for ) => {
    const renderers = {
        header: Header,
        filter: Filter,
        default: Body,
    }

    return renderers[for] || renderers['default'];
}

const Renderer = ({ for, props }) => {
    const Renderer = getRenderer(for);
    return <Renderer { ...props } />
}
