import React from 'react';
import PropTypes from "prop-types";

import { paramsResolver } from '../../utils';

const _toggleDropdown = ( event ) => {
    event.preventDefault();
    event.target.parentElement.classList.toggle('open');
}

const _handleAction = ( action, data, event, massActions, context ) => {
    let params = paramsResolver(action.params, data);
    if( !params.toString() ) {
        alert("No item(s) selected");
        return false;
    }

    switch( action.type ) {
        case 'route':
            context.router.history.push({
                pathname: action.route,
                search: '?' + params.toString()
            });
            break;

        case 'action':
            massActions[action.name](params.get());
            break;
    }
}

const _renderAction = ( key, data, action, massActions, context ) => {
    switch( action.type ) {
        case 'route':
            return (
                <li key={ key } className="dropdown-item">
                    <a
                        className={ action.name }
                        href="#"
                        onClick={ (event) => _handleAction(action, data, event, massActions, context) }>
                        { action.label }
                    </a>
                </li>
            );

        case 'action':
            if( !action.actions ) {
                return (
                    <li key={ key } className="dropdown-item">
                        <a
                            className={ action.name }
                            href="#"
                            onClick={ (event) => _handleAction(action, data, event, massActions, context) }>
                            { action.label }
                        </a>
                    </li>
                )
            }

            return (
                <li key={ key } className="dropdown-item dropdown-submenu dropdown-menu-right">
                    <a className={ action.name } href="#" onClick={ (event) => _toggleDropdown(event) }>
                        { action.label }
                        <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu">
                        { Object.keys(action.actions).map( (key) =>
                            _renderAction( key, data, action.actions[key], massActions, context) ) }
                    </ul>
                </li>
            )

    }
}

const MassActions = ({ data, query, config, massActions }, context) =>
    <div className="dropdown">
        <button
            className="btn btn-default dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            onClick={ (event) => _toggleDropdown(event) }>
                Actions
                <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
            { Object.keys(config).map( (key) => _renderAction(key, data, config[key], massActions, context) ) }
        </ul>
    </div>


MassActions.propTypes = {
    data: PropTypes.object.isRequired,
    query: PropTypes.object,
    config: PropTypes.object.isRequired,
};

MassActions.contextTypes = {
    router: PropTypes.object
};

export default MassActions;
