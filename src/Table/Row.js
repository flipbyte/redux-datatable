import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import Renderer from './Column/Renderer';
import { withTableConfig } from '../TableProvider';
import { denormalize } from 'normalizr';

const Row = ({ index, width, data, top, config: { columns } }) =>
    <div className={ 'flutter-table-body-row ' + (index % 2 == 0 ? 'even' : 'odd') }
        style={{ top: top + 'px', width: width + 'px' }}>
        { _.map(columns, ( column, key ) =>
            <div className="flutter-table-row-item" key={ key }  style={{ width: column.width }}>
                <Renderer
                    index={ column.name }
                    data={ data }
                    renderer={ column.renderer }
                    colConfig={ column } />
            </div>
        ) }
    </div>

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
