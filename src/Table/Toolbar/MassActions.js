import _ from 'lodash';
import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { deleteData } from '../../actions';
import { prepareActionPayload } from '../../utils'
import { withTableConfig } from '../../TableProvider';
import { getSelectedKeys, getConfigParam } from '../../utils';

const _toggleDropdown = ( event ) => {
    event.preventDefault();
    event.target.parentElement.classList.toggle('open');
}

const _handleAction = ( action, selection, event, massActions ) => {
    let dataKey = getConfigParam(action.indexField);
    let selectedItems = getSelectedKeys(selection, dataKey);

    if( !selectedItems || !selectedItems[dataKey] || selectedItems[dataKey].length == 0 ) {
        alert("No item(s) selected");
        return false;
    }

    switch( action.type ) {
        // case 'route':
        //     context.router.history.push({
        //         pathname: action.route,
        //         search: '?' + selectedItems.toString()
        //     });
        //     break;

        case 'action':
            massActions[action.name](selectedItems.get());
            break;

        default:
            break;
    }
}

const _renderItem = ( key, action, selection, massActions ) =>
    <li key={ key } className="dropdown-item">
        <a
            className={ action.name }
            href="#"
            onClick={ (event) => _handleAction(action, selection, event, massActions) }>
            { action.label }
        </a>
    </li>

const _renderAction = ( key, selection, action, massActions ) => {
    switch( action.type ) {
        case 'route':
            return _renderItem(key, action, selection, massActions);

        case 'action':
            if( !action.actions ) {
                return _renderItem(key, action, selection, massActions);
            }

            return (
                <li key={ key } className="dropdown-item dropdown-submenu dropdown-menu-right">
                    <a className={ action.name } href="#" onClick={ _toggleDropdown.bind(this) }>
                        { action.label }
                        <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu">
                        { _.map(action.actions, ( actionItem, key) =>
                            _renderAction( key, selection, actionItem, massActions)
                        ) }
                    </ul>
                </li>
            )

    }
}

const MassActions = ({ selection, config: { massActionsConfig }, massActions }) =>
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
            { _.map(massActionsConfig, ( massActionItem, key ) =>
                _renderAction(key, selection, massActionItem, massActions)
            ) }
        </ul>
    </div>


const mapStateToProps = ( state, { config: { reducerName, name } } ) => ({
    selection: _.get(state, [reducerName, name, 'selection'], {}),
});

const mapDispatchToProps = ( dispatch, { config } ) => ({
    massActions: {
        delete: ( params ) =>
            confirm("Are your sure you want to delete these item(s)?")
                ? dispatch(deleteData(prepareActionPayload(config)({ params })))
                : false,
    }

});

export default withTableConfig({
    name: 'name',
    reducerName: 'reducerName',
    massActionsConfig: 'toolbar.massActions',
    routes: 'routes'
})(connect(mapStateToProps, mapDispatchToProps)(MassActions));
