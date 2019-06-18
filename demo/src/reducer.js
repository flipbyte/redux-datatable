import _ from 'lodash';
import * as actions from '../../src/actions';

export default function reducer(state = {}, action) {
    if (!action.meta) {
        return state;
    }

    const { payload, meta: { name } } = action;
    const acceptedActions = {
        [actions.RECEIVE_DATA]: () => ({
            ...state,
            ..._.get(payload, ['entities', 'pages'], {})
        })
    };

    if (acceptedActions.hasOwnProperty(action.type) && name === 'pages') {
        return acceptedActions[action.type]();
    }

    return state;
}
