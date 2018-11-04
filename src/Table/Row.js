import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import Renderer from './Column/Renderer';
import { withTableConfig } from '../TableProvider';
import { denormalize } from 'normalizr';

const Row = ({ key, data, config: { columns } }) =>
    <tr>
        { _.map(columns, ( column, key ) => (
            <Renderer key={ key }
                index={ column.name }
                data={ data }
                renderer={ column.renderer }
                colConfig={ column } />
        )) }
    </tr>

const mapStateToProps = ( state, { itemIndex, config: { reducerName, name, entity } } ) => {
    var normalizedData = _.get(state, [ entity.state, itemIndex ], {});
    var relatedEntities = _.get(entity, 'relatedEntities', {});
    var entities = _.reduce(relatedEntities, (entities, path, key) => {
        entities[key] = _.get(state, path, {});
        return  entities;
    }, {});

    return ({
        data: denormalize(normalizedData, entity.schema, entities)
    })
}

export default withTableConfig({
    name: 'name',
    reducerName: 'reducerName',
    columns: 'columns',
    entity: 'entity'
})(connect(mapStateToProps)(Row));
