import React from 'react';
import Styles from './Styles';
import Filter from './Renderer/Filter';
import Header from './Renderer/Header';
import Body from './Renderer/Body';

const getRenderer = (ofType) => {
    const renderers = {
        header: Header,
        filter: Filter,
        default: Body,
    }

    return renderers[ofType] || renderers['default'];
}

const Renderer = ({ ofType, ...props }) => {
    const Renderer = getRenderer(ofType);
    return <Renderer { ...props } />
}

export default Renderer;
