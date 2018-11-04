import _ from 'lodash';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { deleteData } from '../../actions';
import { prepareActionPayload } from '../../utils'
import { withTableConfig } from '../../TableProvider';
import { getSelectedKeys, getConfigParam } from '../../utils';

class MassActions extends Component {
    constructor( props ) {
        super(props);
        this.state = { open: false };

        this.toggle = this.toggle.bind(this);
        this.manageEvents = this.manageEvents.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }

    componentWillUnmount() {
        this.manageEvents(true);
    }

    toggle( e ) {
        let isOpen = !this.state.open;
        if(isOpen) {
            this.manageEvents();
        } else {
            this.manageEvents(true);
        }

        this.setState({ open: isOpen })
    }

    manageEvents(remove = false) {
        var eventUpdater = document.addEventListener;
        if(remove) {
            eventUpdater = document.removeEventListener;
        }

        ['click', 'touchstart', 'keyup'].forEach( event =>
            eventUpdater(event, this.handleDocumentClick, true)
        );
    }

    handleDocumentClick(e) {
        if (e && (e.which === 3 || (e.type === 'keyup' && e.which !== keyCodes.tab))) {
            return;
        }

        const container = ReactDOM.findDOMNode(this);
        if (container.contains(e.target) && container !== e.target
            && (e.type !== 'keyup' || e.which === keyCodes.tab)
        ) {
            return;
        }

        this.toggle(e);
    }

    handleAction( action, event ) {
        const { selection, massActions } = this.props;

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

    renderItem( key, action ) {
        return <li key={ key } className="dropdown-item">
            <a
                className={ action.name }
                href="#"
                onClick={ (event) => this.handleAction(action, event) }>
                { action.label }
            </a>
        </li>
    }

    render() {
        const { label, ...actions } = this.props.itemConfig;
        return (
            <div className={ 'dropdown ' + (this.state.open ? 'open': '') }>
                <button
                    className="btn btn-default dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    onClick={ this.toggle }>
                        { label }
                        <span className="caret"></span>
                </button>
                <ul className={ 'dropdown-menu ' + (this.state.open ? 'show': '') }>
                    { _.map(actions, ( action, key ) => this.renderItem(key, action) ) }
                </ul>
            </div>
        )
    }
}

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
    routes: 'routes',
    entity: 'entity'
})(connect(mapStateToProps, mapDispatchToProps)(MassActions));
