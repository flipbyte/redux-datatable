import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { getExtendedStyles } from '../utils';
import { StyleSheetManager } from 'styled-components'
import { SET_IS_PRINTING } from '../constants';

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.containerEl = document.createElement('div');
        this.externalWindow = null;
    }

    render() {
        return ReactDOM.createPortal(
            <StyleSheetManager target={ this.externalWindow.document.head }>
                { this.props.children }
            </StyleSheetManager>,
            this.containerEl
        );
    }

    componentWillMount() {
        this.externalWindow = window.open('', '_blank');
    }

    componentDidMount() {
        const { internalStateUpdater } = this.props;
        this.externalWindow.document.body.appendChild(this.containerEl);
        this.externalWindow.print();
        this.externalWindow.onfocus = () => {
            internalStateUpdater({ type: SET_IS_PRINTING, value: false })
            this.externalWindow.close();
        }
        // Array.from(document.head.getElementsByTagName('STYLE'))
        //   .filter(style => style.innerText.startsWith('\n/* sc-component-id: sc-global'))
        //   .forEach(style => this.externalWindow.document.head.appendChild(style.cloneNode(true)));
    }

    componentWillUnmount() {
        this.externalWindow.close();
    }
}

export default Popup;
