import React from 'react';
import PropTypes from "prop-types";
import qs from 'qs';
import { paramsResolver } from '../../../utils';

const _handleAction = (event, data, action, props, context) => {
    switch( action.type ) {
        case 'route':
            context.router.history.push({
                pathname: action.route,
                search: '?' + paramsResolver(action.params, data)
            })
            break;

        case 'action':

            break;

        default:
            break;
    }
};

const _renderBtn = ( key, data, action, props, context ) =>
    <button key ={ key }
        type="button"
        className={ action.btnClass }
        onClick={ (event) => _handleAction(event, data, action, props, context) }>
        { action.label }
    </button>


const Actions = ( props, context ) => {
    const {
        data,
        config: {
            children
        },
        ...rest
    } = props;
    return (<td>
        <div className="btn-group-sm">
            { Object.keys(children).map( (key) => (
                _renderBtn( key, data, children[key], { ... rest } , context)
            )) }
        </div>
    </td>)
};

Actions.contextTypes = {
    router: PropTypes.object
};

export default Actions;
