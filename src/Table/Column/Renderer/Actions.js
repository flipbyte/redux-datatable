import React from 'react';
import PropTypes from "prop-types";
import qs from 'qs';

const _prepareParams = (params, data) => {
    let processedParams = {};
    for(var key in params) {
        if( !params[key].startsWith('@') ) {
            continue;
        }

        let dataKey = params[key].substr(1);
        if(!data[dataKey]) {
            continue;
        }

        processedParams[key] = data[dataKey];
    }

    // Object.keys(params).map( (key) => ({
    //     if( !params[key].startsWith('@') ) {
    //         return;
    //     }
    //
    //     let dataKey = params[key].substr(1);
    //     if(!data[dataKey]) {
    //         return;
    //     }
    //
    //     processedParams[key] = data[dataKey];
    // })

    console.log(qs.stringify(processedParams));
    return qs.stringify(processedParams);
}

const _handleAction = (event, data, action, props, context) => {
    switch( action.type ) {
        case 'route':
            context.router.history.push({
                pathname: action.route,
                search: '?' + _prepareParams(action.params, data)
            })
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
