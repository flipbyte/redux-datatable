import React from 'react';
import PropTypes from "prop-types";

const _renderMassAction = ({ name, url, query, massActions }) =>
    <div></div>

const Toolbar = ({ name, url, query, config }) =>
    <div>
    </div>;

Toolbar.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    config: PropTypes.object.isRequired,
    // setSortOrder: PropTypes.func,
    // setFilter: PropTypes.func
};

// { _renderMassAction({ name, url, query, config.massActions }) }

export default Toolbar;
