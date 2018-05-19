import React from 'react';
import PropTypes from "prop-types";

import Renderer from './Column/Renderer';

const Body = ({ query, columns, data, deleter }) =>
    <tbody>
        { data.map((item, index) => (
            <tr key={ index }>
                { Object.keys(columns).map( (key) => (
                    <Renderer key={ key }
                        query={ query }
                        deleter={ deleter }
                        index={ columns[key].name }
                        data={ item }
                        renderer={ columns[key].renderer }
                        config={ columns[key] } />
                )) }
            </tr>
        )) }
    </tbody>

Body.propTypes = {
    columns: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    deleter: PropTypes.func
};

Body.defaultProps = {
    columns: {},
    data: {}
};

export default Body;
