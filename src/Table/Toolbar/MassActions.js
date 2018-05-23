import React from 'react';
import PropTypes from "prop-types";

import { getSelectedKeys, getConfigParam } from '../../utils';

const _toggleDropdown = ( event ) => {
    event.preventDefault();
    event.target.parentElement.classList.toggle('open');
}

const _handleAction = ( action, selection, event, massActions, context ) => {
    let dataKey = getConfigParam(action.indexField);
    let selectedItems = getSelectedKeys(selection, dataKey);

    if( !selectedItems || !selectedItems[dataKey] || selectedItems[dataKey].length == 0 ) {
        alert("No item(s) selected");
        return false;
    }

    switch( action.type ) {
        case 'route':
            context.router.history.push({
                pathname: action.route,
                search: '?' + selectedItems.toString()
            });
            break;

        case 'action':
            massActions[action.name](selectedItems.get());
            break;

        default:
            break;
    }
}

const _renderItem = (key, action, selection, massActions, context) =>
    <li key={ key } className="dropdown-item">
        <a
            className={ action.name }
            href="#"
            onClick={ (event) => _handleAction(action, selection, event, massActions, context) }>
            { action.label }
        </a>
    </li>

const _renderAction = ( key, selection, action, massActions, context ) => {
    switch( action.type ) {
        case 'route':
            return _renderItem(key, action, selection, massActions, context);

        case 'action':
            if( !action.actions ) {
                return _renderItem(key, action, selection, massActions, context);
            }

            return (
                <li key={ key } className="dropdown-item dropdown-submenu dropdown-menu-right">
                    <a className={ action.name } href="#" onClick={ (event) => _toggleDropdown(event) }>
                        { action.label }
                        <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu">
                        { Object.keys(action.actions).map( (key) =>
                            _renderAction( key, selection, action.actions[key], massActions, context) ) }
                    </ul>
                </li>
            )

    }
}

const MassActions = ({ selection, query, config, massActions }, context) =>
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
            { Object.keys(config).map( (key) => _renderAction(key, selection, config[key], massActions, context) ) }
        </ul>
    </div>


MassActions.propTypes = {
    selection: PropTypes.object.isRequired,
    query: PropTypes.object,
    config: PropTypes.object.isRequired,
};

MassActions.contextTypes = {
    router: PropTypes.object
};

export default MassActions;
