import React, { Fragment } from 'react';
import Button from '../../components/Button';
import { TOGGLE_EDITABLE } from '../../constants';

const defaultLabels = {
    show: 'Make editable',
    hide: 'Hide editable',
    save: 'Save'
};

const EditableButtons = ({ itemConfig, isModified, isEditable, isEditing, internalStateUpdater, thunk }) => {
    const { save } = itemConfig;
    const labels = _.merge(defaultLabels, itemConfig.labels);
    const toggleEditable = () => internalStateUpdater({ type: TOGGLE_EDITABLE });
    const getEditableLabel = () => !isEditing ? labels.show : labels.hide;
    return isEditable && (
        <Fragment>
            { !isModified && (
                <Button className="rdt-toolbar-button reset-filters" onClick={ toggleEditable.bind(this) }>
                    { getEditableLabel() }
                </Button>
            )}
            { isModified && (
                <Button className="rdt-toolbar-button reset-filters" onClick={ save && thunk.bind(this, save, { itemConfig }) }>
                    { labels.save }
                </Button>
            )}
        </Fragment>
    );
};

export default EditableButtons;
