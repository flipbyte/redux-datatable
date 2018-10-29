import _ from 'lodash';
import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { deleteData } from '../../../actions';
import { withTableConfig } from '../../../TableProvider';
import { paramsResolver, prepareActionPayload } from '../../../utils'

const _handleAction = ( event, data, action, { actions } ) => {
    let params = paramsResolver(action.params, data);
    actions[action.name](params.get(), action.action);
};

const _renderBtn = ( key, data, action, props ) =>
    <button key ={ key }
        type="button"
        className={ action.btnClass }
        onClick={ (event) => _handleAction(event, data, action, props) }>
        { action.label }
    </button>


const Actions = ( props ) => {
    const {
        data,
        colConfig: {
            children
        },
        ...rest
    } = props;
    return (
        <td>
            <div className="btn-group-sm">
                { _.map(children, ( action, key ) =>
                    _renderBtn( key, data, action, { ...rest })
                ) }
            </div>
        </td>
    )
};

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
    routes: 'routes'
})(connect(null, mapDispatchToProps)(Actions));
