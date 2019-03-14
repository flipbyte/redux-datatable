import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Renderer from './Column/Renderer';
import { withTableConfig } from '../TableProvider';
import { denormalize } from 'normalizr';

class Row extends Component {
    constructor(props) {
        super(props);

        this.state = { show: false };
    }

    componentDidMount() {
        var self = this;
        if (!this.state.show) {
            setTimeout(function() {
                self.setState({ show: true });
            }, 10);
        }
    }

    render() {
        const { index, width, height, data, top, config: { columns } } = this.props;

        return <div className={ 'flutter-table-body-row ' + (index % 2 == 0 ? 'even' : 'odd') }
            style={{ top, width, height }}>
            { this.state.show && _.map(columns, ( column, key ) =>
                <div className="flutter-table-row-item" key={ key }  style={{ width: column.width }}>
                    <Renderer
                        index={ column.name }
                        data={ data }
                        renderer={ column.renderer }
                        colConfig={ column } />
                </div>
            ) }
        </div>;
    }
}

const mapStateToProps = ( state, { item, config: { reducerName, name, entity } } ) => {
    if (!entity) {
        return { data: item }
    }

    var normalizedData = _.get(state, [ entity.state, item ], {});
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
