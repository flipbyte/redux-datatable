import _ from 'lodash';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { setSelection } from '../../../actions';
import { withTableConfig } from '../../../TableProvider';
import { getParam, getConfigParam, prepareActionPayload } from '../../../utils';
import { memoizedGetSelection } from '../../../selectors';

const handleSelection = ({ data, colConfig, setSelection }, event ) => {
    let dataKey = getConfigParam(colConfig.indexField);
    let param = getParam(colConfig.indexField, data);
    setSelection(dataKey, param, event.target.checked)
}

class Selection extends Component {
    shouldComponentUpdate( nextProps ) {
        const { selection } = this.props;
        const { selection: nextSelection } = nextProps;

        return selection != nextSelection;
    }

    render() {
        const { selection, ...rest } = this.props;
        return (
            <div className="col-12">
                <input
                    type="checkbox"
                    checked={ selection }
                    onChange={ handleSelection.bind(this, rest) } />
            </div>
        );
    }
}

const mapStateToProps = ( state, {
    data,
    config: { reducerName, name },
    colConfig: { indexField }
}) => {
    let dataKey = getConfigParam(indexField);
    var key = _.get(data, dataKey);

    return {
        selection: _.get(state, [reducerName, name, 'selection', dataKey, key], false)
    }
}

const mapDispatchToProps = ( dispatch, { config } ) => ({
    setSelection: ( paramKey, key, value ) =>
        dispatch(setSelection(prepareActionPayload(config)({ paramKey, key, value }))),
});

export default withTableConfig({
    name: 'name',
    reducerName: 'reducerName',
    routes: 'routes',
    entity: 'entity'
})(connect(mapStateToProps, mapDispatchToProps)(Selection));
