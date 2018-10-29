import _ from 'lodash';
import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import Renderer from './Column/Renderer';
import { withTableConfig } from '../TableProvider';

const Body = ({ config: { columns }, data, actions }) =>
    <tbody>
        { data.map((item, index) => (
            <tr key={ index }>
                { _.map(columns, ( column, key) => (
                    <Renderer key={ key }
                        actions={ actions }
                        index={ column.name }
                        data={ item }
                        renderer={ column.renderer }
                        colConfig={ column } />
                )) }
            </tr>
        )) }
    </tbody>

const mapStateToProps = ( state, { config: { reducerName, name } } ) => ({
    data: _.get(state, [reducerName, name, 'items'], {})
});

export default withTableConfig({
    name: 'name',
    reducerName: 'reducerName',
    columns: 'columns',
})(connect(mapStateToProps)(Body));
