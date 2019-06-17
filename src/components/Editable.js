import _ from 'lodash';
import React, { Fragment } from 'react';
import { Button } from '../styled-components';
import { TOGGLE_EDITABLE } from '../constants';

const Editable = ({ config, isModified, isEditing, setIsEditing, thunk }) => {
    const {
        save,
        labels: {
            show = 'Make editable',
            hide = 'Hide editable',
            save: saveLabel = 'Save',
        },
        styles = {}
    } = config;
    const toggleEditable = () => setIsEditing(state => !state);
    const getEditableLabel = () => !isEditing ? show : hide;
    const getEditableStyles = () => !isEditing ? styles.show : styles.hide;
    return (
        <Fragment>
            { !isModified && (
                <Button
                    className="rdt-toolbar-button reset-filters"
                    onClick={ toggleEditable.bind(this) }
                    styles={ getEditableStyles() }
                >
                    { getEditableLabel() }
                </Button>
            )}
            { isModified && (
                <Button
                    className="rdt-toolbar-button reset-filters"
                    onClick={ save && thunk.bind(this, save, { config }) }
                    styles={ styles.save }
                >
                    { saveLabel }
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
