import React, { Fragment } from 'react';
import Button from '../styled-components/Button';
import { TOGGLE_EDITABLE } from '../constants';

const defaultLabels = {
    show: 'Make editable',
    hide: 'Hide editable',
    save: 'Save'
};

const Editable = ({ config, isModified, isEditing, setIsEditing, thunk }) => {
    const { save } = config;
    const labels = _.merge(defaultLabels, config.labels);
    const toggleEditable = () => setIsEditing(state => !state);
    const getEditableLabel = () => !isEditing ? labels.show : labels.hide;
    return (
        <Fragment>
            { !isModified && (
                <Button className="rdt-toolbar-button reset-filters" onClick={ toggleEditable.bind(this) }>
                    { getEditableLabel() }
                </Button>
            )}
            { isModified && (
                <Button className="rdt-toolbar-button reset-filters" onClick={ save && thunk.bind(this, save, { config }) }>
                    { labels.save }
                </Button>
            )}
        </Fragment>
    );
};

Editable.mapPropsToComponent = ({
    thunk,
    tableData,
    editing: [ isEditing, setIsEditing ]
}) => ({ isEditing, setIsEditing, thunk, isModified: tableData && !_.isEmpty(tableData.modified) });

export default Editable;
