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

    render() {
        const { itemConfig, thunk } = this.props;
        const { label, options } = itemConfig;
        const { open } = this.state;

        return (
            <Dropdown>
                <Button outline noRadius dropdownToggle onClick={ this.toggle }>
                    { label }
                </Button>
                <DropdownMenu hidden={ !open } noRadius>
                    { options.map(({ thunk: cb, ...option }, index) =>
                        <DropdownItem key={ index } onClick={ cb && thunk.bind(this, cb, { option }) }>
                            { option.label }
                        </DropdownItem>
                    )}
                </DropdownMenu>
            </Dropdown>
        )
    }
}

export default MassActions
