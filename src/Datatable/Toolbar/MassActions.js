import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { deleteData } from '../../actions';
import { prepareActionPayload } from '../../utils'
import { getSelectedKeys, getConfigParam } from '../../utils';
import { Dropdown, DropdownItem, DropdownMenu } from 'styled-dropdown-component';
import { Button } from 'styled-button-component';

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

    componentDidMount() {
        this.manageEvents();
    }

    toggle( e ) {
        const { open } = this.state;
        this.setState({ open: !open })
    }

    manageEvents(remove = false) {
        var eventUpdater = remove ? document.removeEventListener : document.addEventListener;

        ['click', 'touchstart', 'keyup'].forEach( event =>
            eventUpdater(event, this.handleDocumentClick, true)
        );
    }

    handleDocumentClick(e) {
        if (e && (e.which === 3 || (e.type === 'keyup' && e.which !== 9))) {
            return;
        }

        const container = ReactDOM.findDOMNode(this);
        if (container.contains(e.target) && container !== e.target
            && (e.type !== 'keyup' || e.which === 9)
        ) {
            return;
        }

        if (this.state.open) {
            this.toggle(e);
        }
    }

    handleAction( action, event ) {
        const {
            data: { selection },
            massActions
        } = this.props;

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

    render() {
        const { label, options } = this.props.itemConfig;
        const { open } = this.state;
        return (
            <Dropdown>
                <Button outline noRadius dropdownToggle onClick={ this.toggle }>
                    { label }
                </Button>
                <DropdownMenu hidden={ !open } noRadius>
                    { options.map((option, index) =>
                        <DropdownItem key={ index } onClick={ this.handleAction.bind(this, option) }>
                            { option.label }
                        </DropdownItem>
                    )}
                </DropdownMenu>
            </Dropdown>
        )
    }
}

const mapDispatchToProps = ( dispatch, { config } ) => ({
    massActions: {
        delete: ( params ) =>
            confirm("Are your sure you want to delete these item(s)?")
                ? dispatch(deleteData(prepareActionPayload(config)({ params })))
                : false,
    }

});

export default connect(null, mapDispatchToProps)(MassActions)
