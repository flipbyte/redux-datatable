import _ from 'lodash';
import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { withTableConfig } from '../TableProvider';
import Row from './Row';

const Body = ({ config: { columns }, data, actions, config: { reducerName, name } }) =>
    <tbody>
        { _.map(data, (item, index) => (
            <Row key={ index } itemIndex={ item } />
        )) }
    </tbody>

const mapStateToProps = ( state, { config: { reducerName, name } } ) => ({
    data: _.get(state, [reducerName, name, 'items'], [])
})

export default withTableConfig({
    name: 'name',
    reducerName: 'reducerName',
})(connect(mapStateToProps)(Body));
