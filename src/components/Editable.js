import _ from 'lodash';
import React, { Fragment, useContext } from 'react';
import { Button } from '../styled-components';
import { SET_IS_EDITING } from '../actions';
import { useSelector } from 'react-redux';
import ConfigContext from '../context';

const Editable = ({ config }) => {
    const {
        save,
        labels: {
            show = 'Make editable',
            hide = 'Hide editable',
            save: saveLabel = 'Save',
        },
        styles = {}
    } = config;
    const { action, thunk, getData } = useContext(ConfigContext);
    const { isEditing, isModified } = useSelector(getData((tableData) => ({
        isEditing: tableData.isEditing,
        isModified: !_.isEmpty(tableData.modified)
    })));
    const toggleEditable = () => action(SET_IS_EDITING)({ value: !isEditing });
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

// Editable.mapPropsToComponent = ({
//     thunk,
//     action,
//     tableData: { isEditing, modified },
// }) => ({ isEditing, action, thunk, isModified: modified && !_.isEmpty(modified) });

export default Editable;
