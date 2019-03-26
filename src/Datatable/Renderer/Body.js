import React from 'react';
import Styles from '../Styles';

import Text from './Body/Text';
import Date from './Body/Date';
import Image from './Body/Image';
import Actions from './Body/Actions';
import Options from './Body/Options';
import Selection from './Body/Selection';

const renderers = {
    date: Date,
    actions: Actions,
    selection: Selection,
    options:  Options,
    image: Image,
    default: Text
};

const ColumnRenderer = ( props ) => {
    const { renderer, type } = props.colConfig;
    const Component = renderer || renderers[type] || renderers['default'];
    return <Component { ...props } />
};

const Body = ({ index, item, top, action, thunk, extra, ...column }) =>
    <Styles.TableCell body width={ `${column.width}px` } textAlign={ column.textAlign }>
        <ColumnRenderer data={ item } colConfig={ column } extraData={ extra } action={ action } thunk={ thunk }/>
    </Styles.TableCell>

export default Body;
