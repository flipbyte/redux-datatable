import React from 'react';
import PropTypes from "prop-types";
import { paramsResolver } from '../../../utils';

const Selection = ( props ) => {
    const {
        data,
        config: {
            children
        },
        ...rest
    } = props;
    return (<td>
        <div className="col-12">
            <input type="checkbox" id="exampleCheck1" />
        </div>
    </td>)
};

Selection.contextTypes = {
    router: PropTypes.object
};

export default Selection;
