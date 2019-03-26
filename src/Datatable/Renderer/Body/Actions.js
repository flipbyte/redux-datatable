import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { deleteData } from '../../../actions';
import { withTableConfig } from '../../../TableProvider';
import { paramsResolver, prepareActionPayload } from '../../../utils'
import { Button } from 'styled-button-component';

class Actions extends Component {
    constructor( props ) {
        super(props);

        this.handleAction = this.handleAction.bind(this);
    }

    handleAction( action ) {
        const { data, actions } = this.props;
        const params = paramsResolver(action.params, data);
        actions[action.name](params.get(), action.action);
    }

    render() {
        const {
            colConfig: { items },
            extra,
            thunk
        } = this.props;
        return (
            <div className="btn-group-sm">
                { items.map((item, index) =>
                    <Button
                        key={ index }
                        noRadius
                        sm
                        onClick={ thunk && thunk.bind(this, item.thunk, { item, extra }) }
                    >
                        { item.label }
                    </Button>
                )}
            </div>
        )
    }
}

export default Actions;
