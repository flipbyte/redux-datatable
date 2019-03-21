import React, { Component } from 'react';
import { Button } from 'styled-button-component';
import { Dropdown, DropdownItem, DropdownMenu } from 'styled-dropdown-component';

class Columns extends Component {
    constructor(props) {
        super(props);

        this.state = { open: false };
        this.updateColumns = this.updateColumns.bind(this);
        this.toggle = this.toggle.bind(this);
        this.manageEvents = this.manageEvents.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }

    updateColumns( index, event ) {
        const { checkedColumns, allColumns, updateTableState } = this.props.config;

        var activeColumns = [];
        if(event.target.checked) {
            activeColumns = [ ...checkedColumns, index ];
        } else {
            const itemIndex = checkedColumns.indexOf(index);
            activeColumns = [ ...checkedColumns ];
            activeColumns.splice(itemIndex, 1);
        }
        activeColumns.sort();

        const columns = activeColumns.reduce((result, currentIndex) => (
            result.concat([allColumns[currentIndex]])
        ), []);

        updateTableState({ columns, checkedColumns: activeColumns });
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
        if (e && (e.which === 3 || (e.type === 'keyup' && e.which !== 9))) {
            return;
        }

        const container = ReactDOM.findDOMNode(this);
        if (container.contains(e.target) && container !== e.target
            && (e.type !== 'keyup' || e.which === 9)
        ) {
            return;
        }

        this.toggle(e);
    }

    render() {
        const { config: { allColumns, checkedColumns }} = this.props;
        const { open } = this.state;

        return (
            <Dropdown>
                <Button outline noRadius dropdownToggle onClick={ this.toggle }>
                    Columns
                </Button>
                <DropdownMenu hidden={ !open } noRadius>
                    { allColumns.map(({ name, label }, index) =>
                        <DropdownItem key={ index }>
                            <input name={ name }
                                type="checkbox"
                                defaultChecked={ -1 !== checkedColumns.indexOf(index) }
                                onChange={ this.updateColumns.bind(null, index) } />
                            <label htmlFor={ name }>{ label }</label>
                        </DropdownItem>
                    )}
                </DropdownMenu>
            </Dropdown>
        );
    }
}

export default Columns;
