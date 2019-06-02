import React, { Fragment } from 'react';
import Button from '../../components/Button';
import { TOGGLE_EDITABLE } from '../../constants';

const EditableButtons = ({ itemConfig, action, isModified, isEditable, isEditing, internalStateUpdater, thunk }) => {
    const { editableLabel, saveLabel, save } = itemConfig;
    const toggleEditable = () => internalStateUpdater({ type: TOGGLE_EDITABLE });
    const getEditableLabel = () => !isEditing ? editableLabel[0] || 'Make editable' : editableLabel[1] || 'Hide editable';
    return isEditable && (
        <Fragment>
            { !isModified && (
                <Button className="rdt-toolbar-button reset-filters" onClick={ toggleEditable.bind(this) }>
                    { getEditableLabel() }
                </Button>
            )}
            { isModified && (
                <Button className="rdt-toolbar-button reset-filters" onClick={ save && thunk.bind(this, save, { itemConfig, action }) }>
                    { itemConfig.saveLabel || 'Save' }
                </Button>
            )}
        </Fragment>
    );
};

export default EditableButtons;
