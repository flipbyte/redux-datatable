import ReduxDatatable from './createTable';
import reducer from './reducer';
import * as epics from './epics';
import TableProvider, { TableConsumer, withTableConfig } from './TableProvider';
import * as actions from './actions';
import * as utils from './utils';

export { TableProvider, TableConsumer, withTableConfig, actions, utils, reducer, epics }
export default ReduxDatatable;
