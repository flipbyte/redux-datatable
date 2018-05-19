import React from 'react';
import PropTypes from "prop-types";

const _renderMassAction = ({ query, massActions }) =>
    <div></div>

const Toolbar = ({ query, config }) =>
    <div>
    </div>;

Toolbar.propTypes = {
    config: PropTypes.object.isRequired,
    // setSortOrder: PropTypes.func,
    // setFilter: PropTypes.func
};

// { _renderMassAction({ name, url, query, config.massActions }) }

export default Toolbar;
