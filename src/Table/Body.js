import React from 'react';
import PropTypes from "prop-types";

import Renderer from './Column/Renderer';

const Body = ({ columns, data }) =>
    <tbody>
        {data.map((item, index) => (
            <tr key={ index }>
                { Object.keys(columns).map( (key) => (
                    !!columns[key].name &&
                        <Renderer key={ key }
                            index={ columns[key].name }
                            data={ item }
                            renderer={ columns[key].renderer }
                            config={ columns[key] } />
                )) }
            </tr>
        ))}
    </tbody>

Body.propTypes = {
    columns: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
};

Body.defaultProps = {
    columns: {},
    data: {}
};

export default Body;
