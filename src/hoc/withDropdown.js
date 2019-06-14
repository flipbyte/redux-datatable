import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const withDropdown = WrappedComponent => (
    class extends Component {
        constructor(props) {
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
            return (
                <WrappedComponent ref={ this.ref } toggle={ this.toggle } open={ this.state.open } { ...this.props } />
            )
        }
    }
);

export default withDropdown;
