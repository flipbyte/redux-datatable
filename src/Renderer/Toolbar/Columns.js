import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';

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
        const { columnUpdater } = this.props;

        if(event.target.checked) {
            columnUpdater({ type: 'add', index })
        } else {
            columnUpdater({ type: 'remove', index })
        }
    }

    componentWillUnmount() {
        this.manageEvents(true);
    }

    componentDidMount() {
        this.manageEvents();
    }

    toggle( e ) {
        const { open } = this.state;
        // if(isOpen) {
        //     this.manageEvents();
        // } else {
        //     this.manageEvents(true);
        // }
        //
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
        const {
            itemConfig: { style = {} },
            columns = [],
            visibleColumns = []
        } = this.props;
        const { open } = this.state;

        return (
            <Dropdown.Container>
                <Button dropdownToggle onClick={ this.toggle } { ...style.button }>
                    Columns
                </Button>
                <Dropdown.Menu hidden={ !open } { ...style.dropdownMenu }>
                    { columns.map(({ name, label }, index) =>
                        <Dropdown.Item key={ index }>
                            <input name={ name }
                                type="checkbox"
                                defaultChecked={ -1 !== visibleColumns.indexOf(index) }
                                onChange={ this.updateColumns.bind(null, index) } />
                            <label htmlFor={ name }>{ label }</label>
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown.Container>
        );
    }
}

export default Columns;
