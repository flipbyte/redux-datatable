import React from 'react';
import ReactDOM from 'react-dom';

const withModal = WrappedComponent => (
    class extends React.Component {
        constructor(props) {
            super(props);
            this.el = document.createElement('div');
        }

        componentDidMount() {
            this.props.root.appendChild(this.el);
        }

        componentWillUnmount() {
            this.props.root.removeChild(this.el);
        }

        render() {
            const { children, ...rest } = this.props;
            return ReactDOM.createPortal(
                <WrappedComponent className="rdt-modal" { ...rest }>{ this.props.children }</WrappedComponent>,
                this.el
            );
        }
    }
);

export default withModal
