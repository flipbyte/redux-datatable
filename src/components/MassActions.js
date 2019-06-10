import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Button from '../styled-components/Button';
import Dropdown from '../styled-components/Dropdown';

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
        this.setState({ open: !open });
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
        const { config, thunk } = this.props;
        const { label, name, options, style = {} } = config;
        const { open } = this.state;

        return (
            <Dropdown.Container className={ `rdt-toolbar-mass-actions ${name || ''}` }>
                <Button className="rdt-toolbar-button" dropdownToggle onClick={ this.toggle } { ...style.button }>
                    { label }
                </Button>
                <Dropdown.Menu className="rdt-toolbar-menu" hidden={ !open } { ...style.dropdownMenu }>
                    { options.map(({ thunk: cb, ...option }, index) =>
                        <Dropdown.Item className="rdt-toolbar-item" key={ index } onClick={ cb && thunk.bind(this, cb, { option }) }>
                            { option.label }
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown.Container>
        );
    }
}

MassActions.mapPropsToComponent = ({ thunk }) => ({ thunk });

export default MassActions;