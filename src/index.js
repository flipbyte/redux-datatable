import FlutterTable from './createTable';
import Table from './Table';
import reducer from './reducer';
import * as epics from './epics';
import TableProvider, { TableConsumer } from './TableProvider';
import * as actions from './actions';
import * as utils from './utils';
import './css/table.css';

export { TableProvider, TableConsumer, Table, actions, utils, reducer, epics }
export default FlutterTable;
