import React from 'react';
import PropTypes from "prop-types";
import { paramsResolver } from '../../../utils';

const _handleAction = (event, data, action, props) => {
    let params = paramsResolver(action.params, data);
    props.actions[action.name](params.get(), action.action);
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
        config: {
            children
        },
        ...rest
    } = props;
    return (<td>
        <div className="btn-group-sm">
            { Object.keys(children).map( (key) => (
                _renderBtn( key, data, children[key], { ... rest })
            )) }
        </div>
    </td>)
};

export default Actions;
