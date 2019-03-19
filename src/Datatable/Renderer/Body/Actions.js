import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { deleteData } from '../../../actions';
import { withTableConfig } from '../../../TableProvider';
import { paramsResolver, prepareActionPayload } from '../../../utils'

class Actions extends Component {
    constructor( props ) {
        super(props);

        this.handleAction = this.handleAction.bind(this);
    }

    handleAction( action ) {
        const { data, actions } = this.props;
        const params = paramsResolver(action.params, data);
        actions[action.name](params.get(), action.action);
    }

    render() {
        const { children } = this.props.colConfig;
        return (
            <div className="btn-group-sm">
                { _.map(children, ( action, key ) =>
                    <button key ={ key }
                        type="button"
                        className={ action.btnClass }
                        onClick={ this.handleAction.bind(null, action) }>
                        { action.label }
                    </button>
                ) }
            </div>
        )
    }
}

const mapDispatchToProps = ( dispatch, { config } ) => ({
    actions: {
        route: ( payload, type ) => dispatch({
            type: type,
            payload: payload
        }),
        delete: ( params ) =>
            confirm("Are your sure you want to delete this page?")
                ? dispatch(deleteData(prepareActionPayload(config)({ params })))
                : false,
    }
});

export default withTableConfig({
    name: 'name',
    reducerName: 'reducerName',
    routes: 'routes',
    entity: 'entity'
})(connect(null, mapDispatchToProps)(Actions));
