import _ from 'lodash';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { withTableConfig } from '../TableProvider';

class Columns extends Component {
    constructor(props) {
        super(props);

        this.state = { open: false };
        this.updateColumns = this.updateColumns.bind(this);
        this.toggle = this.toggle.bind(this);
        this.manageEvents = this.manageEvents.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }

    updateColumns( stateUpdater, allColumns, columns, column, event ) {
        var activeColumns = {};
        if(event.target.checked) {
            activeColumns = { ...columns, [event.target.name]: column }
        } else {
            const { [event.target.name]: removedColumn, ...rest } = columns;
            activeColumns = rest;
        }

        stateUpdater({ columns: _.pick(allColumns, _.intersection(_.keys(allColumns), _.keys(activeColumns)))});
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

    render() {
        const { config: { allColumns, columns, stateUpdater }} = this.props;

        return (
            <div className={ 'active-columns dropdown ' + (this.state.open ? 'open': '') }>
                <button
                    className="btn btn-default dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    onClick={ this.toggle }>
                    Columns <span className="caret"></span>
                </button>
                <ul className={ 'dropdown-menu ' + (this.state.open ? 'show': '') }>
                    { _.map(allColumns, ( column, key ) =>
                        <li key={ key } className="dropdown-item">
                            <input name={ key }
                                type="checkbox"
                                defaultChecked={ _.has(columns, key) }
                                onChange={ this.updateColumns.bind(null, stateUpdater, allColumns, columns, column) } />
                            <label htmlFor={ key }>{ column.label }</label>
                        </li>
                    ) }
                </ul>
            </div>
        );
    }
}

export default withTableConfig({
    stateUpdater: 'updateTableState',
    allColumns: 'allColumns',
    columns: 'columns'
})(Columns);
