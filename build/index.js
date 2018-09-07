module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 28);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRoute = exports.createReducer = exports.createActionCreator = exports.paramsResolver = exports.getParam = exports.getConfigParam = exports.getSelectedKeys = exports.getUrl = exports.defaultLimiterCongig = undefined;

var _qs = __webpack_require__(34);

var _qs2 = _interopRequireDefault(_qs);

var _pathParser = __webpack_require__(30);

var _pathParser2 = _interopRequireDefault(_pathParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultLimiterCongig = exports.defaultLimiterCongig = {
    options: [10, 20, 50, 100, 200],
    default: 10
};

// export const isSelectionEmpty = (obj)  => {
//     for(var key in obj) {
//         if(obj.hasOwnProperty(key))
//             return false;
//     }
//
//     return true;
// }

var getUrl = exports.getUrl = function getUrl(baseUrl, endpoint) {
    return baseUrl + endpoint;
};

// export const pushRoute = ( action, params, context ) => context.router.history.push({
//     pathname: action.route,
//     search: '?' + params.toString()
// });

var getSelectedKeys = exports.getSelectedKeys = function getSelectedKeys(data, dataKey) {
    if (!data[dataKey]) {
        return false;
    }

    var selectedItems = {};
    selectedItems[dataKey] = Object.keys(data[dataKey]).filter(function (key) {
        if (data[dataKey][key] == true) return key;
    });

    var paramsObject = Object.assign({}, selectedItems);
    paramsObject.get = function () {
        return selectedItems;
    };
    paramsObject.toString = function () {
        return _qs2.default.stringify(selectedItems);
    };
    return paramsObject;
};

var getConfigParam = exports.getConfigParam = function getConfigParam(param) {
    if (!param.startsWith('@')) {
        return false;
    }

    return param.substr(1);
};

var getParam = exports.getParam = function getParam(param, data) {
    var dataKey = getConfigParam(param);
    if (!dataKey) {
        return false;
    }

    if (!data[dataKey]) {
        return false;
    }

    return data[dataKey];
};

var paramsResolver = exports.paramsResolver = function paramsResolver(params, data) {
    var processedParams = {};
    for (var key in params) {
        var resolvedParam = getParam(params[key], data);
        if (false === resolvedParam) {
            continue;
        }

        processedParams[key] = resolvedParam;
    }

    var paramsObject = Object.assign({}, processedParams);
    paramsObject.get = function () {
        return processedParams;
    };
    paramsObject.toString = function () {
        return _qs2.default.stringify(processedParams);
    };;

    return paramsObject;
};

// export const getValueByPath = ( obj, path ) =>
//     path.reduce((acc, currVal) => (acc && acc[currVal]) ? acc[currVal] : null, obj);

var createActionCreator = exports.createActionCreator = function createActionCreator(type) {
    return function (data) {
        var name = data.name,
            url = data.url,
            reducerName = data.reducerName,
            resultPath = data.resultPath,
            routes = data.routes,
            payload = data.payload;

        var action = { type: type, name: name, url: url, routes: routes, reducerName: reducerName, resultPath: resultPath, payload: payload };
        action.toString = function () {
            return type;
        };

        return action;
    };
};

var createReducer = exports.createReducer = function createReducer(reducer, predicate) {
    return function (state, action) {
        return predicate(action) || state === undefined ? reducer(state, action) : state;
    };
};

var getRoute = exports.getRoute = function getRoute(url, route, params) {
    var pathParser = new _pathParser2.default(route);
    var formattedRoute = pathParser.build(params);
    var routeParams = pathParser.test(formattedRoute);

    for (var key in routeParams) {
        if (!routeParams.hasOwnProperty(key)) {
            continue;
        }
        delete params[key];
    }

    pathParser.getFormattedRoute = function () {
        return formattedRoute;
    };
    pathParser.getParams = function () {
        return routeParams;
    };
    pathParser.getUrlParams = function () {
        return params;
    };
    pathParser.getFormattedUrl = function () {
        return '' + url + formattedRoute + '?' + _qs2.default.stringify(params);
    };

    return pathParser;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.actionCreators = exports.DELETE_DATA = exports.SET_MESSAGE = exports.SET_SELECTION = exports.SET_LIMIT = exports.SET_SORT = exports.SET_FILTER = exports.SET_PAGE = exports.REQUEST_DATA_CANCEL = exports.RECEIVE_DATA = exports.REQUEST_DATA = undefined;

var _utils = __webpack_require__(2);

var REQUEST_DATA = exports.REQUEST_DATA = 'REQUEST_DATA';
var RECEIVE_DATA = exports.RECEIVE_DATA = 'RECEIVE_DATA';
var REQUEST_DATA_CANCEL = exports.REQUEST_DATA_CANCEL = 'REQUEST_DATA_CANCEL';

var SET_PAGE = exports.SET_PAGE = 'SET_PAGE';
var SET_FILTER = exports.SET_FILTER = 'SET_FILTER';
var SET_SORT = exports.SET_SORT = 'SET_SORT';
var SET_LIMIT = exports.SET_LIMIT = 'SET_LIMIT';
var SET_SELECTION = exports.SET_SELECTION = 'SET_SELECTION';
var SET_MESSAGE = exports.SET_MESSAGE = 'SET_MESSAGE';

var DELETE_DATA = exports.DELETE_DATA = 'DELETE_DATA';

var actionCreators = exports.actionCreators = {
    cancelRequest: (0, _utils.createActionCreator)(REQUEST_DATA_CANCEL),
    requestData: (0, _utils.createActionCreator)(REQUEST_DATA),
    receiveData: (0, _utils.createActionCreator)(RECEIVE_DATA),
    setPage: (0, _utils.createActionCreator)(SET_PAGE),
    setSort: (0, _utils.createActionCreator)(SET_SORT),
    setLimit: (0, _utils.createActionCreator)(SET_LIMIT),
    setFilter: (0, _utils.createActionCreator)(SET_FILTER),
    setSelection: (0, _utils.createActionCreator)(SET_SELECTION),
    deleteData: (0, _utils.createActionCreator)(DELETE_DATA),
    setMessage: (0, _utils.createActionCreator)(SET_MESSAGE)
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SEARCH_TYPE_DATE = exports.SEARCH_OPERATOR_NOT_IN = exports.SEARCH_OPERATOR_IN = exports.SEARCH_OPERATOR_IS = exports.SEARCH_OPERATOR_BETWEEN = exports.SEARCH_OPERATOR_CONTAINS = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _String = __webpack_require__(20);

var _String2 = _interopRequireDefault(_String);

var _Number = __webpack_require__(19);

var _Number2 = _interopRequireDefault(_Number);

var _Date = __webpack_require__(18);

var _Date2 = _interopRequireDefault(_Date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SEARCH_OPERATOR_CONTAINS = exports.SEARCH_OPERATOR_CONTAINS = 'contains';
var SEARCH_OPERATOR_BETWEEN = exports.SEARCH_OPERATOR_BETWEEN = 'between';
var SEARCH_OPERATOR_IS = exports.SEARCH_OPERATOR_IS = 'is';
var SEARCH_OPERATOR_IN = exports.SEARCH_OPERATOR_IN = 'in';
var SEARCH_OPERATOR_NOT_IN = exports.SEARCH_OPERATOR_NOT_IN = 'not in';
var SEARCH_TYPE_DATE = exports.SEARCH_TYPE_DATE = 'date';

var Filter = function Filter(props) {
    if (props.type == 'number') return _react2.default.createElement(_Number2.default, props);
    if (props.type == 'string') return _react2.default.createElement(_String2.default, props);
    if (props.type == 'date') return _react2.default.createElement(_Date2.default, props);
    return _react2.default.createElement(_String2.default, props);
};

Filter.propTypes = {
    filterer: _propTypes2.default.func.isRequired,
    type: _propTypes2.default.string.isRequired,
    name: _propTypes2.default.string.isRequired
};

Filter.defaultProps = {
    type: "string"
};

exports.default = Filter;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("lodash/get");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Header = __webpack_require__(21);

var _Header2 = _interopRequireDefault(_Header);

var _Body = __webpack_require__(11);

var _Body2 = _interopRequireDefault(_Body);

var _Pagination = __webpack_require__(24);

var _Pagination2 = _interopRequireDefault(_Pagination);

var _Limiter = __webpack_require__(22);

var _Limiter2 = _interopRequireDefault(_Limiter);

var _Toolbar = __webpack_require__(26);

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Message = __webpack_require__(23);

var _Message2 = _interopRequireDefault(_Message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var calculatePaginationProps = function calculatePaginationProps(page, limit, count, defaultLimit) {
    page = page > 1 ? page : 1;
    limit = limit > defaultLimit ? limit : defaultLimit;

    var start = (page - 1) * limit;
    var end = start + limit - 1;

    return {
        page: page,
        start: start,
        end: count > end ? end : count,
        count: count,
        limit: limit,
        total: Math.ceil(count / limit)
    };
};

var Table = function Table(props) {
    var title = props.title,
        message = props.message,
        name = props.name,
        selection = props.selection,
        query = props.query,
        toolbar = props.toolbar,
        limiterConfig = props.limiterConfig,
        config = props.config,
        data = props.data,
        isFetching = props.isFetching,
        setLimit = props.setLimit,
        setPage = props.setPage,
        setFilter = props.setFilter,
        setSortOrder = props.setSortOrder,
        actions = props.actions,
        massActions = props.massActions;


    return _react2.default.createElement(
        'div',
        null,
        !!message.type && _react2.default.createElement(_Message2.default, { message: message }),
        _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
                'div',
                { className: 'col-sm-12 col-md-9' },
                _react2.default.createElement(_Toolbar2.default, {
                    selection: selection,
                    query: query,
                    massActions: massActions,
                    config: config.toolbar })
            ),
            _react2.default.createElement(
                'div',
                { className: 'col-sm-12 col-md-3' },
                _react2.default.createElement(_Limiter2.default, {
                    setLimit: setLimit,
                    options: limiterConfig.options })
            )
        ),
        _react2.default.createElement(
            'div',
            { id: name, className: 'flutter-table-container table-responsive' },
            _react2.default.createElement(
                'table',
                { className: 'table table-sm table-hover flutter-table' },
                _react2.default.createElement(_Header2.default, {
                    columns: config.columns,
                    query: query,
                    data: data,
                    setSortOrder: setSortOrder,
                    setFilter: setFilter,
                    setSelection: actions.setSelection }),
                _react2.default.createElement(_Body2.default, {
                    query: query,
                    data: data,
                    selection: selection,
                    actions: actions,
                    columns: config.columns })
            ),
            _react2.default.createElement('div', { className: 'flutter-table-loader ' + (isFetching ? 'show' : '') })
        ),
        _react2.default.createElement(_Pagination2.default, _extends({
            setPage: setPage
        }, calculatePaginationProps(query.page, query.limit, query.count, limiterConfig.default)))
    );
};

Table.propTypes = {
    name: _propTypes2.default.string.isRequired,
    config: _propTypes2.default.shape({
        toolbar: _propTypes2.default.object,
        columns: _propTypes2.default.object
    }).isRequired,
    limiterConfig: _propTypes2.default.shape({
        options: _propTypes2.default.array,
        default: _propTypes2.default.number
    }).isRequired,
    data: _propTypes2.default.array.isRequired,
    query: _propTypes2.default.shape({
        sort: _propTypes2.default.string,
        dir: _propTypes2.default.string,
        page: _propTypes2.default.number,
        limit: _propTypes2.default.number,
        offset: _propTypes2.default.number,
        count: _propTypes2.default.number,
        search: _propTypes2.default.object
    }).isRequired,
    actions: _propTypes2.default.object
};

Table.defaultProps = {
    data: {},
    query: {
        limit: 10,
        offset: 1,
        search: {}
    }
};

exports.default = Table;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TableConsumer = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConfigContext = _react2.default.createContext({});

var TableProvider = function TableProvider(_ref) {
    var config = _ref.config,
        children = _ref.children;

    return _react2.default.createElement(
        ConfigContext.Provider,
        { value: config },
        children
    );
};

var TableConsumer = exports.TableConsumer = function TableConsumer(_ref2) {
    var children = _ref2.children;
    return _react2.default.createElement(
        ConfigContext.Consumer,
        null,
        function (config) {
            return children({ config: config });
        }
    );
};

exports.default = TableProvider;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(35);

var _get = __webpack_require__(5);

var _get2 = _interopRequireDefault(_get);

var _actions = __webpack_require__(3);

var _Table = __webpack_require__(6);

var _Table2 = _interopRequireDefault(_Table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { createActionCreator, createReducer, defaultLimiterCongig, getRoute } from './utils';
// import * as actions from './actions';


var FlutterTable = function (_Component) {
    _inherits(FlutterTable, _Component);

    function FlutterTable() {
        _classCallCheck(this, FlutterTable);

        return _possibleConstructorReturn(this, (FlutterTable.__proto__ || Object.getPrototypeOf(FlutterTable)).apply(this, arguments));
    }

    _createClass(FlutterTable, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.props.loadData();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.clearMessage();
        }
    }, {
        key: 'setValidPage',
        value: function setValidPage(nextProps) {
            if (!nextProps.query || nextProps.query.count <= 0) {
                return true;
            }

            var totalEntries = parseInt(nextProps.query.count);
            var totalPages = Math.ceil(totalEntries / nextProps.query.limit);
            if (totalPages < this.props.query.page) {
                this.props.setPage(totalPages);
                return false;
            }

            return true;
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return this.setValidPage(nextProps);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                name = _props.name,
                config = _props.config,
                tablesData = _props.tablesData;


            if (!name || !tablesData || !tablesData[name]) {
                return _react2.default.createElement(
                    'div',
                    { className: 'status_message offline' },
                    _react2.default.createElement(
                        'p',
                        null,
                        'The table failed to initialise. Please check you are connected to the internet and try again.'
                    )
                );
            }

            var tableData = tablesData[name];
            var tableProps = {
                isFetching: tableData.isFetching,
                data: tableData.items,
                query: tableData.query,
                selection: tableData.selection,
                message: tableData.message
            };

            return _react2.default.createElement(_Table2.default, _extends({ name: name,
                config: config,
                limiterConfig: config.limiterConfig
            }, tableProps, this.props));
        }
    }]);

    return FlutterTable;
}(_react.Component);

var requestData = _actions.actionCreators.requestData,
    _setPage = _actions.actionCreators.setPage,
    setSort = _actions.actionCreators.setSort,
    _setLimit = _actions.actionCreators.setLimit,
    _setFilter = _actions.actionCreators.setFilter,
    _setSelection = _actions.actionCreators.setSelection,
    deleteData = _actions.actionCreators.deleteData,
    setMessage = _actions.actionCreators.setMessage;


var prepareActionPayload = function prepareActionPayload(ownProps) {
    return function (payload) {
        var url = ownProps.url,
            name = ownProps.name,
            reducerName = ownProps.reducerName,
            _ownProps$config = ownProps.config,
            resultPath = _ownProps$config.resultPath,
            routes = _ownProps$config.routes;


        return { name: name, url: url, reducerName: reducerName, routes: routes, resultPath: resultPath, payload: payload };
    };
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        tablesData: state.flutterTable
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
    var preparePayload = prepareActionPayload(ownProps);
    return {
        loadData: function loadData() {
            dispatch(_setPage(preparePayload({ page: 1 })));
            dispatch(_setLimit(preparePayload({ limit: 10 })));
        },
        clearMessage: function clearMessage() {
            dispatch(setMessage(preparePayload({})));
        },
        setPage: function setPage(page) {
            return dispatch(_setPage(preparePayload({ page: page })));
        },
        setSortOrder: function setSortOrder(sort, dir) {
            return dispatch(setSort(preparePayload({ sort: sort, dir: dir })));
        },
        setLimit: function setLimit(limit) {
            return dispatch(_setLimit(preparePayload({ limit: limit })));
        },
        setFilter: function setFilter(key, filter) {
            return dispatch(_setFilter(preparePayload({ key: key, filter: filter })));
        },
        actions: {
            setSelection: function setSelection(paramKey, key, value) {
                return dispatch(_setSelection(preparePayload({ paramKey: paramKey, key: key, value: value })));
            },
            delete: function _delete(params) {
                return confirm("Are your sure you want to delete this page?") ? dispatch(deleteData(preparePayload({ params: params }))) : false;
            }
        },
        massActions: {
            delete: function _delete(params) {
                return confirm("Are your sure you want to delete these page(s)?") ? dispatch(deleteData(preparePayload({ params: params }))) : false;
            }
        }
    };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FlutterTable);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteDataEpic = exports.fetchDataEpic = exports.setParamsEpic = undefined;

var _Observable = __webpack_require__(36);

var _get = __webpack_require__(5);

var _get2 = _interopRequireDefault(_get);

var _operator = __webpack_require__(32);

var _of = __webpack_require__(37);

var _utils = __webpack_require__(2);

var _actions = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { denormalize, normalize } from 'normalizr';
var setParamsEpic = exports.setParamsEpic = function setParamsEpic(action$, store) {
    return action$.ofType(_actions.SET_PAGE, _actions.SET_FILTER, _actions.SET_SORT, _actions.SET_LIMIT).concatMap(function (action) {
        var name = action.name,
            url = action.url,
            routes = action.routes,
            resultPath = action.resultPath,
            reducerName = action.reducerName;


        return _Observable.Observable.of(_actions.actionCreators.cancelRequest({ name: name }), _actions.actionCreators.requestData({
            name: name, url: url, routes: routes, resultPath: resultPath, reducerName: reducerName, payload: { query: (0, _get2.default)(store.getState(), [reducerName, name]).query }
        }));
    });
};

var fetchDataEpic = exports.fetchDataEpic = function fetchDataEpic(action$, store, _ref) {
    var api = _ref.api,
        schemas = _ref.schemas;
    return action$.ofType(_actions.REQUEST_DATA).switchMap(function (action) {
        var name = action.name,
            url = action.url,
            routes = action.routes,
            resultPath = action.resultPath,
            payload = action.payload;


        return api((0, _utils.getRoute)(url, routes.fetch.route, Object.assign({}, routes.fetch.params, payload.query)).getFormattedUrl()).map(function (response) {
            var requestResponse = (0, _get2.default)(response, resultPath.fetch.response, null);
            var data = (0, _get2.default)(response, resultPath.fetch.data, null);
            // const data = schemas && schemas[name] ? normalize(result, [schemas[name]]) : result;
            var payload = { response: requestResponse, data: data };

            return _actions.actionCreators.receiveData({ name: name, payload: payload });
        }).takeUntil(action$.ofType(_actions.REQUEST_DATA_CANCEL).filter(function (cancelAction) {
            return cancelAction.name == name;
        }));
    });
};

var deleteDataEpic = exports.deleteDataEpic = function deleteDataEpic(action$, store, _ref2) {
    var api = _ref2.api,
        schemas = _ref2.schemas;
    return action$.ofType(_actions.DELETE_DATA).switchMap(function (action) {
        var name = action.name,
            url = action.url,
            routes = action.routes,
            resultPath = action.resultPath,
            reducerName = action.reducerName,
            payload = action.payload;


        return api((0, _utils.getRoute)(url, routes.delete.route, payload.params).getFormattedUrl(), { method: 'delete' }).concatMap(function (response) {
            var result = (0, _get2.default)(response, resultPath.delete, null);
            if (result.success) {
                return _Observable.Observable.of(_actions.actionCreators.setMessage({ type: 'success', message: result.result }), _actions.actionCreators.cancelRequest({ name: name }), _actions.actionCreators.requestData({
                    name: name, url: url, routes: routes, resultPath: resultPath, reducerName: reducerName,
                    payload: { query: (0, _get2.default)(store.getState(), [reducerName, name]).query }
                }));
            }

            return _actions.actionCreators.setMessage({ type: 'danger', message: result.result });
        });
    });
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

var _objectAssignDeep = __webpack_require__(29);

var _objectAssignDeep2 = _interopRequireDefault(_objectAssignDeep);

var _actions = __webpack_require__(3);

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialTableState = {
    isFetching: false,
    title: "",
    name: '',
    items: [],
    query: {
        dir: 'desc',
        sort: null,
        page: 0,
        limit: 20,
        offset: 0,
        count: 0,
        search: {}
    },
    message: {},
    selection: {}
};

var updateState = function updateState(state, tableName) {
    return function (newState) {
        var updatedState = (0, _objectAssignDeep2.default)({}, initialTableState, state[tableName], newState);
        return _extends({}, state, _defineProperty({}, tableName, _extends({}, state[tableName], updatedState)));
    };
};

var getTableState = function getTableState(name) {
    return function (state) {
        return state[name] ? state[name] : initialTableState;
    };
};

function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];
    var payload = action.payload,
        name = action.name;

    var tableState = getTableState(name);
    var stateUpdater = updateState(state, name);

    switch (action.type) {
        case actions.REQUEST_DATA:
            return stateUpdater({ isFetching: true });

        case actions.RECEIVE_DATA:
            return stateUpdater({
                isFetching: false,
                query: {
                    count: parseInt(payload.response.total)
                },
                items: payload.data,
                selection: {}
            });

        case actions.SET_PAGE:
            var offset = (payload.page - 1) * tableState(state).query.limit;
            offset = offset > 0 ? offset : 0;

            return stateUpdater({
                query: {
                    page: payload.page,
                    offset: offset
                }
            });

        case actions.SET_SORT:
            return stateUpdater({
                query: {
                    sort: payload.sort,
                    dir: payload.dir
                }
            });

        case actions.SET_LIMIT:
            return stateUpdater({
                query: {
                    limit: parseInt(payload.limit),
                    offset: (tableState(state).query.page - 1) * tableState(state).query.limit
                }
            });

        case actions.SET_FILTER:
            return stateUpdater({
                query: {
                    search: _defineProperty({}, payload.key, payload.filter)
                }
            });

        case actions.SET_SELECTION:
            var selection = {};
            if (_typeof(payload.key) == 'object') {
                payload.key.map(function (key) {
                    return selection[key] = payload.value;
                });
            } else {
                selection[payload.key] = payload.value;
            }

            return stateUpdater({
                selection: _defineProperty({}, payload.paramKey, _extends({}, selection))
            });
        // return {
        //     ...state,
        //     selection: {
        //         ...state.selection,
        //         [payload.paramKey]: {
        //             ...state.selection[payload.paramKey],
        //             ...selection
        //         }
        //     }
        // }

        case actions.SET_MESSAGE:
            return stateUpdater({
                message: payload
            });

        default:
            return state;
    }
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Renderer = __webpack_require__(13);

var _Renderer2 = _interopRequireDefault(_Renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Body = function Body(_ref) {
    var query = _ref.query,
        columns = _ref.columns,
        data = _ref.data,
        selection = _ref.selection,
        actions = _ref.actions;
    return _react2.default.createElement(
        'tbody',
        null,
        data.map(function (item, index) {
            return _react2.default.createElement(
                'tr',
                { key: index },
                Object.keys(columns).map(function (key) {
                    return _react2.default.createElement(_Renderer2.default, { key: key,
                        query: query,
                        actions: actions,
                        index: columns[key].name,
                        data: item,
                        renderer: columns[key].renderer,
                        config: columns[key],
                        selection: selection });
                })
            );
        })
    );
};

Body.propTypes = {
    columns: _propTypes2.default.object.isRequired,
    data: _propTypes2.default.array.isRequired,
    actions: _propTypes2.default.object
};

Body.defaultProps = {
    columns: {},
    data: {}
};

exports.default = Body;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var changeSortOrder = function changeSortOrder(_ref, event) {
    var query = _ref.query,
        name = _ref.name,
        sorter = _ref.sorter;

    var dir = null;
    if (query.sort != name) {
        dir = 'asc';
    } else {
        if (query.dir == 'asc') {
            dir = 'desc';
        } else if (query.dir == 'desc') {
            name = '';
            dir = '';
        } else {
            dir = 'asc';
        }
    }

    sorter(name, dir);
};

var _prepareHeader = function _prepareHeader(props) {
    return props.sortable ? _react2.default.createElement(
        'th',
        _extends({
            className: 'sortable ' + props.name + ' ' + (props.name == props.query.sort ? props.query.dir : ''),
            onClick: function onClick(event) {
                return changeSortOrder(props, event);
            }
        }, props.attributes),
        props.label,
        ' ',
        _react2.default.createElement('b', { className: 'sort-caret' })
    ) : _react2.default.createElement(
        'th',
        null,
        props.label
    );
};

var Cell = function Cell(_ref2) {
    var name = _ref2.name,
        query = _ref2.query,
        label = _ref2.label,
        isHeader = _ref2.isHeader,
        sortable = _ref2.sortable,
        sorter = _ref2.sorter,
        attributes = _ref2.attributes;
    return isHeader ? _prepareHeader({ name: name, query: query, label: label, isHeader: isHeader, sortable: sortable, sorter: sorter, attributes: attributes }) : _react2.default.createElement(
        'td',
        attributes,
        label
    );
};

Cell.propTypes = {
    name: _propTypes2.default.string.isRequired,
    isHeader: _propTypes2.default.bool.isRequired,
    sortable: _propTypes2.default.bool.isRequired,
    sorter: _propTypes2.default.func,
    label: _propTypes2.default.string,
    attributes: _propTypes2.default.object
};

Cell.defaultProps = {
    isHeader: false,
    attributes: {}
};

exports.default = Cell;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Text = __webpack_require__(17);

var _Text2 = _interopRequireDefault(_Text);

var _Date = __webpack_require__(15);

var _Date2 = _interopRequireDefault(_Date);

var _Actions = __webpack_require__(14);

var _Actions2 = _interopRequireDefault(_Actions);

var _Selection = __webpack_require__(16);

var _Selection2 = _interopRequireDefault(_Selection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _render = function _render(ComponentName, props) {
    return _react2.default.createElement(ComponentName, props);
};

var Renderer = function Renderer(_ref) {
    var query = _ref.query,
        index = _ref.index,
        data = _ref.data,
        renderer = _ref.renderer,
        config = _ref.config,
        selection = _ref.selection,
        actions = _ref.actions;

    if (renderer) {
        return _render(renderer, { index: index, data: data, config: config, query: query, selection: selection, actions: actions });
    } else {
        switch (config.type) {
            case 'date':
                return _render(_Date2.default, { index: index, data: data });

            case 'actions':
                return _render(_Actions2.default, { query: query, data: data, config: config, actions: actions });

            case 'selection':
                return _render(_Selection2.default, { query: query, data: data, config: config, selection: selection, setSelection: actions.setSelection });

            default:
                return _render(_Text2.default, { index: index, data: data });

        }
    }
};

Renderer.propTypes = {
    index: _propTypes2.default.string,
    data: _propTypes2.default.object.isRequired,
    renderer: _propTypes2.default.func,
    config: _propTypes2.default.object,
    actions: _propTypes2.default.object
};

exports.default = Renderer;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _handleAction = function _handleAction(event, data, action, props, context) {
    var params = (0, _utils.paramsResolver)(action.params, data);
    switch (action.type) {
        case 'route':
            context.router.history.push({
                pathname: action.route,
                search: '?' + params.toString()
            });
            break;

        case 'action':
            props.actions[action.name](params.get());
            break;

        default:
            break;
    }
};

var _renderBtn = function _renderBtn(key, data, action, props, context) {
    return _react2.default.createElement(
        'button',
        { key: key,
            type: 'button',
            className: action.btnClass,
            onClick: function onClick(event) {
                return _handleAction(event, data, action, props, context);
            } },
        action.label
    );
};

var Actions = function Actions(props, context) {
    var data = props.data,
        children = props.config.children,
        rest = _objectWithoutProperties(props, ['data', 'config']);

    return _react2.default.createElement(
        'td',
        null,
        _react2.default.createElement(
            'div',
            { className: 'btn-group-sm' },
            Object.keys(children).map(function (key) {
                return _renderBtn(key, data, children[key], _extends({}, rest), context);
            })
        )
    );
};

Actions.contextTypes = {
    router: _propTypes2.default.object
};

exports.default = Actions;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactPureTime = __webpack_require__(31);

var _reactPureTime2 = _interopRequireDefault(_reactPureTime);

var _get = __webpack_require__(5);

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Date = function Date(_ref) {
    var index = _ref.index,
        data = _ref.data;
    return _react2.default.createElement(
        'td',
        null,
        _react2.default.createElement(_reactPureTime2.default, { value: (0, _get2.default)(data, index, ''), format: 'F j, Y, g:i a' })
    );
};

exports.default = Date;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _handleSelection = function _handleSelection(_ref, event) {
    var data = _ref.data,
        config = _ref.config,
        setSelection = _ref.setSelection;

    var dataKey = (0, _utils.getConfigParam)(config.indexField);
    var param = (0, _utils.getParam)(config.indexField, data);
    setSelection(dataKey, param, event.target.checked);
};

var _isSelected = function _isSelected(_ref2) {
    var data = _ref2.data,
        selection = _ref2.selection,
        config = _ref2.config;

    var dataKey = (0, _utils.getConfigParam)(config.indexField);
    var param = (0, _utils.getParam)(config.indexField, data);
    return selection[dataKey] && selection[dataKey][param] ? selection[dataKey][param] : false;
};

var Selection = function Selection(props) {
    return _react2.default.createElement(
        'td',
        null,
        _react2.default.createElement(
            'div',
            { className: 'col-12' },
            _react2.default.createElement('input', {
                type: 'checkbox',
                checked: _isSelected(props),
                onChange: function onChange(event) {
                    return _handleSelection(props, event);
                } })
        )
    );
};

Selection.contextTypes = {
    router: _propTypes2.default.object
};

exports.default = Selection;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _get = __webpack_require__(5);

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Text = function Text(_ref) {
    var index = _ref.index,
        data = _ref.data;
    return _react2.default.createElement(
        'td',
        null,
        ' ',
        (0, _get2.default)(data, index, ''),
        ' '
    );
};

exports.default = Text;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Filter = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dateFrom = null;
var dateTo = null;

var _applyFilter = function _applyFilter(key, filterer, event) {
    var filter = {};

    if (key == 0) {
        dateFrom = event.target.value;
    } else {
        dateTo = event.target.value;
    }

    if (dateFrom || dateTo) {
        filter = {
            operator: _Filter.SEARCH_OPERATOR_BETWEEN,
            field: event.target.name,
            value: [dateFrom, dateTo],
            logic: 'where',
            type: 'date'
        };
    }

    filterer(event.target.name, filter);
};

var Date = function Date(_ref) {
    var name = _ref.name,
        filterer = _ref.filterer;
    return _react2.default.createElement(
        'td',
        null,
        _react2.default.createElement('input', {
            className: 'form-control',
            type: 'date',
            name: name,
            onChange: function onChange(event) {
                return _applyFilter(0, filterer, event);
            },
            placeholder: 'From' }),
        _react2.default.createElement('input', {
            className: 'form-control',
            type: 'date',
            name: name,
            onChange: function onChange(event) {
                return _applyFilter(1, filterer, event);
            },
            placeholder: 'To' })
    );
};

Date.propTypes = {
    filterer: _propTypes2.default.func.isRequired,
    name: _propTypes2.default.string.isRequired
};

exports.default = Date;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Filter = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var valFrom = null;
var valTo = null;

var _applyFilter = function _applyFilter(key, filterer, event) {
    var filter = {};

    if (key == 0) {
        valFrom = event.target.value;
    } else {
        valTo = event.target.value;
    }

    if (valFrom || valTo) {
        filter = {
            operator: _Filter.SEARCH_OPERATOR_BETWEEN,
            field: event.target.name,
            value: [valFrom, valTo],
            logic: 'where',
            type: 'number'
        };
    }

    filterer(event.target.name, filter);
};

var Number = function Number(_ref) {
    var name = _ref.name,
        filterer = _ref.filterer;
    return _react2.default.createElement(
        'td',
        null,
        _react2.default.createElement('input', {
            className: 'form-control',
            type: 'number',
            name: name,
            onChange: function onChange(event) {
                return _applyFilter(0, filterer, event);
            },
            placeholder: 'From' }),
        _react2.default.createElement('input', {
            className: 'form-control',
            type: 'number',
            name: name,
            onChange: function onChange(event) {
                return _applyFilter(1, filterer, event);
            },
            placeholder: 'To' })
    );
};

Number.propTypes = {
    filterer: _propTypes2.default.func.isRequired,
    name: _propTypes2.default.string.isRequired
};

exports.default = Number;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Filter = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _applyFilter = function _applyFilter(filterer, event) {
    var filter = {};
    if (event.target.value) {
        filter = {
            operator: _Filter.SEARCH_OPERATOR_CONTAINS,
            field: event.target.name,
            value: event.target.value,
            logic: 'where'
        };
    }

    filterer(event.target.name, filter);
};

var String = function String(_ref) {
    var name = _ref.name,
        filterer = _ref.filterer;
    return _react2.default.createElement(
        'td',
        null,
        _react2.default.createElement('input', {
            className: 'form-control',
            name: name,
            onChange: function onChange(event) {
                return _applyFilter(filterer, event);
            } })
    );
};

String.propTypes = {
    filterer: _propTypes2.default.func.isRequired,
    name: _propTypes2.default.string.isRequired
};

exports.default = String;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Cell = __webpack_require__(12);

var _Cell2 = _interopRequireDefault(_Cell);

var _Filter = __webpack_require__(4);

var _Filter2 = _interopRequireDefault(_Filter);

var _Selection = __webpack_require__(25);

var _Selection2 = _interopRequireDefault(_Selection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _renderRowItems = function _renderRowItems(props) {
    var key = props.key,
        type = props.type,
        filterer = props.filterer,
        selector = props.selector,
        data = props.data;


    if (type == 'header') return _react2.default.createElement(_Cell2.default, props);
    if (type == 'selection') return _react2.default.createElement(_Selection2.default, _extends({ data: data, selector: selector }, props));
    if (type == 'actions') return _react2.default.createElement('td', { key: key });

    return _react2.default.createElement(_Filter2.default, _extends({ filterer: filterer }, props));
};

var Header = function Header(_ref) {
    var query = _ref.query,
        columns = _ref.columns,
        data = _ref.data,
        setSortOrder = _ref.setSortOrder,
        setFilter = _ref.setFilter,
        setSelection = _ref.setSelection;
    return _react2.default.createElement(
        'thead',
        null,
        _react2.default.createElement(
            'tr',
            { className: 'headers' },
            Object.keys(columns).map(function (key) {
                return _renderRowItems({
                    key: key,
                    type: "header",
                    isHeader: true,
                    sortable: columns[key].sortable ? true : false,
                    sorter: setSortOrder,
                    name: columns[key].name,
                    label: columns[key].label,
                    attributes: columns[key].attributes,
                    query: query
                });
            })
        ),
        _react2.default.createElement(
            'tr',
            { className: 'filters' },
            Object.keys(columns).map(function (key) {
                return _renderRowItems({
                    key: key,
                    type: columns[key].type,
                    name: columns[key].name,
                    selector: setSelection,
                    filterer: setFilter,
                    data: data,
                    config: columns[key]
                });
            })
        )
    );
};

Header.propTypes = {
    columns: _propTypes2.default.object.isRequired,
    selection: _propTypes2.default.object,
    setSortOrder: _propTypes2.default.func,
    setFilter: _propTypes2.default.func,
    setSelection: _propTypes2.default.func
};

exports.default = Header;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Limiter = function Limiter(_ref) {
    var options = _ref.options,
        setLimit = _ref.setLimit;
    return _react2.default.createElement(
        "label",
        { className: "limiter d-flex justify-content-end" },
        _react2.default.createElement(
            "select",
            { className: "form-control input-sm", id: "limiter", onChange: function onChange(event) {
                    return setLimit(event.target.value);
                } },
            options.map(function (option, index) {
                return _react2.default.createElement(
                    "option",
                    { key: index },
                    option
                );
            })
        ),
        " per page"
    );
};

Limiter.propTypes = {
    options: _propTypes2.default.array.isRequired,
    setLimit: _propTypes2.default.func
};

exports.default = Limiter;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Message = function Message(_ref) {
    var message = _ref.message;
    return _react2.default.createElement(
        'div',
        { className: 'alert alert-' + message.type },
        message.message
    );
};

Message.propTypes = {
    message: _propTypes2.default.object.isRequired
};

exports.default = Message;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NUM_LINKS = 5;

var fillRange = function fillRange(start, end) {
    return Array(end - start + 1).fill().map(function (item, index) {
        return start + index;
    });
};

var getPages = function getPages(currentPage, total) {
    var padding = Math.floor(NUM_LINKS / 2);
    var left = currentPage - padding < padding ? 1 : currentPage - padding;
    var right = left + NUM_LINKS - 1 > total ? total : left + NUM_LINKS - 1;

    left = right == total ? right - NUM_LINKS < 1 ? 1 : right - NUM_LINKS + 1 : left;

    return fillRange(left, right);
};

var lowerLimit = function lowerLimit(page, limit) {
    return (page - 1) * limit + 1;
};
var upperLimit = function upperLimit(page, limit, count) {
    return page * limit > count ? count : page * limit;
};

var Pagination = function Pagination(_ref) {
    var start = _ref.start,
        end = _ref.end,
        page = _ref.page,
        total = _ref.total,
        count = _ref.count,
        limit = _ref.limit,
        setPage = _ref.setPage;
    return _react2.default.createElement(
        "div",
        { className: "row" },
        _react2.default.createElement(
            "div",
            { className: "col-sm-12 col-md-6" },
            !!count > 0 && _react2.default.createElement(
                "span",
                null,
                "Showing ",
                lowerLimit(page, limit),
                " to ",
                upperLimit(page, limit, count),
                " of ",
                count,
                " entries"
            )
        ),
        _react2.default.createElement(
            "div",
            { className: "col-sm-12 col-md-6" },
            _react2.default.createElement(
                "ul",
                { className: "pagination justify-content-end" },
                _react2.default.createElement(
                    "li",
                    { className: "page-item " + (page < 2 ? 'disabled' : '') },
                    _react2.default.createElement(
                        "a",
                        { className: "page-link", href: "#", onClick: function onClick(event) {
                                return setPage(page - 1);
                            } },
                        "Previous"
                    )
                ),
                getPages(page, total).map(function (link, index) {
                    return _react2.default.createElement(
                        "li",
                        { key: index, className: "page-item " + (link == page ? 'active' : '') },
                        _react2.default.createElement(
                            "a",
                            { className: "page-link", href: "#", onClick: function onClick(event) {
                                    return setPage(link);
                                } },
                            link
                        )
                    );
                }),
                _react2.default.createElement(
                    "li",
                    { className: "page-item " + (page >= total ? 'disabled' : '') },
                    _react2.default.createElement(
                        "a",
                        { className: "page-link", href: "#", onClick: function onClick(event) {
                                return setPage(page + 1);
                            } },
                        "Next"
                    )
                )
            )
        )
    );
};

Pagination.propTypes = {
    start: _propTypes2.default.number.isRequired,
    end: _propTypes2.default.number.isRequired,
    page: _propTypes2.default.number.isRequired,
    total: _propTypes2.default.number.isRequired,
    count: _propTypes2.default.number.isRequired,
    setPage: _propTypes2.default.func
};

exports.default = Pagination;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _handleSelection = function _handleSelection(selector, data, config, event) {
    var dataKey = (0, _utils.getConfigParam)(config.indexField);
    if (!dataKey) {
        return false;
    }

    var params = data.map(function (item) {
        return item[dataKey];
    });

    selector(dataKey, params, event.target.checked);
};

var Selection = function Selection(_ref) {
    var name = _ref.name,
        data = _ref.data,
        config = _ref.config,
        selector = _ref.selector;
    return _react2.default.createElement(
        'td',
        null,
        _react2.default.createElement(
            'div',
            { className: 'col-12' },
            _react2.default.createElement('input', { type: 'checkbox', name: name,
                onChange: function onChange(event) {
                    return _handleSelection(selector, data, config, event);
                } })
        )
    );
};

Selection.propTypes = {
    selector: _propTypes2.default.func.isRequired,
    name: _propTypes2.default.string.isRequired
};

exports.default = Selection;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _MassActions = __webpack_require__(27);

var _MassActions2 = _interopRequireDefault(_MassActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _renderToolbarItem = function _renderToolbarItem(props) {
    if (props.key == 'massActions') return _react2.default.createElement(_MassActions2.default, props);

    return null;
};

var Toolbar = function Toolbar(_ref) {
    var selection = _ref.selection,
        query = _ref.query,
        config = _ref.config,
        massActions = _ref.massActions;
    return Object.keys(config).map(function (key) {
        return _renderToolbarItem({ key: key, selection: selection, query: query, config: config[key], massActions: massActions });
    });
};

Toolbar.propTypes = {
    selection: _propTypes2.default.object.isRequired,
    query: _propTypes2.default.object,
    config: _propTypes2.default.object.isRequired
};

Toolbar.defaultProps = {
    data: {}
};

exports.default = Toolbar;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _toggleDropdown = function _toggleDropdown(event) {
    event.preventDefault();
    event.target.parentElement.classList.toggle('open');
};

var _handleAction = function _handleAction(action, selection, event, massActions, context) {
    var dataKey = (0, _utils.getConfigParam)(action.indexField);
    var selectedItems = (0, _utils.getSelectedKeys)(selection, dataKey);

    if (!selectedItems || !selectedItems[dataKey] || selectedItems[dataKey].length == 0) {
        alert("No item(s) selected");
        return false;
    }

    switch (action.type) {
        case 'route':
            context.router.history.push({
                pathname: action.route,
                search: '?' + selectedItems.toString()
            });
            break;

        case 'action':
            massActions[action.name](selectedItems.get());
            break;

        default:
            break;
    }
};

var _renderItem = function _renderItem(key, action, selection, massActions, context) {
    return _react2.default.createElement(
        'li',
        { key: key, className: 'dropdown-item' },
        _react2.default.createElement(
            'a',
            {
                className: action.name,
                href: '#',
                onClick: function onClick(event) {
                    return _handleAction(action, selection, event, massActions, context);
                } },
            action.label
        )
    );
};

var _renderAction = function _renderAction(key, selection, action, massActions, context) {
    switch (action.type) {
        case 'route':
            return _renderItem(key, action, selection, massActions, context);

        case 'action':
            if (!action.actions) {
                return _renderItem(key, action, selection, massActions, context);
            }

            return _react2.default.createElement(
                'li',
                { key: key, className: 'dropdown-item dropdown-submenu dropdown-menu-right' },
                _react2.default.createElement(
                    'a',
                    { className: action.name, href: '#', onClick: function onClick(event) {
                            return _toggleDropdown(event);
                        } },
                    action.label,
                    _react2.default.createElement('span', { className: 'caret' })
                ),
                _react2.default.createElement(
                    'ul',
                    { className: 'dropdown-menu' },
                    Object.keys(action.actions).map(function (key) {
                        return _renderAction(key, selection, action.actions[key], massActions, context);
                    })
                )
            );

    }
};

var MassActions = function MassActions(_ref, context) {
    var selection = _ref.selection,
        query = _ref.query,
        config = _ref.config,
        massActions = _ref.massActions;
    return _react2.default.createElement(
        'div',
        { className: 'dropdown' },
        _react2.default.createElement(
            'button',
            {
                className: 'btn btn-default dropdown-toggle',
                type: 'button',
                'data-toggle': 'dropdown',
                onClick: function onClick(event) {
                    return _toggleDropdown(event);
                } },
            'Actions',
            _react2.default.createElement('span', { className: 'caret' })
        ),
        _react2.default.createElement(
            'ul',
            { className: 'dropdown-menu' },
            Object.keys(config).map(function (key) {
                return _renderAction(key, selection, config[key], massActions, context);
            })
        )
    );
};

MassActions.propTypes = {
    selection: _propTypes2.default.object.isRequired,
    query: _propTypes2.default.object,
    config: _propTypes2.default.object.isRequired
};

MassActions.contextTypes = {
    router: _propTypes2.default.object
};

exports.default = MassActions;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.epics = exports.reducer = exports.utils = exports.actions = exports.Table = exports.TableConsumer = exports.TableProvider = undefined;

var _createTable = __webpack_require__(8);

var _createTable2 = _interopRequireDefault(_createTable);

var _Table = __webpack_require__(6);

var _Table2 = _interopRequireDefault(_Table);

var _reducer = __webpack_require__(10);

var _reducer2 = _interopRequireDefault(_reducer);

var _epics = __webpack_require__(9);

var epics = _interopRequireWildcard(_epics);

var _TableProvider = __webpack_require__(7);

var _TableProvider2 = _interopRequireDefault(_TableProvider);

var _actions = __webpack_require__(3);

var actions = _interopRequireWildcard(_actions);

var _utils = __webpack_require__(2);

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.TableProvider = _TableProvider2.default;
exports.TableConsumer = _TableProvider.TableConsumer;
exports.Table = _Table2.default;
exports.actions = actions;
exports.utils = utils;
exports.reducer = _reducer2.default;
exports.epics = epics;
exports.default = _createTable2.default;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * OBJECT ASSIGN DEEP
 * Allows deep cloning of plain objects that contain primitives, nested plain objects, or nested plain arrays.
 */

/*
 * A unified way of returning a string that describes the type of the given variable.
 */
function getTypeOf (input) {

	if (input === null) {
		return 'null';
	}

	else if (typeof input === 'undefined') {
		return 'undefined';
	}

	else if (typeof input === 'object') {
		return (Array.isArray(input) ? 'array' : 'object');
	}

	return typeof input;

}

/*
 * Branching logic which calls the correct function to clone the given value base on its type.
 */
function cloneValue (value) {

	// The value is an object so lets clone it.
	if (getTypeOf(value) === 'object') {
		return quickCloneObject(value);
	}

	// The value is an array so lets clone it.
	else if (getTypeOf(value) === 'array') {
		return quickCloneArray(value);
	}

	// Any other value can just be copied.
	return value;

}

/*
 * Enumerates the given array and returns a new array, with each of its values cloned (i.e. references broken).
 */
function quickCloneArray (input) {
	return input.map(cloneValue);
}

/*
 * Enumerates the properties of the given object (ignoring the prototype chain) and returns a new object, with each of
 * its values cloned (i.e. references broken).
 */
function quickCloneObject (input) {

	const output = {};

	for (const key in input) {
		if (!input.hasOwnProperty(key)) { continue; }

		output[key] = cloneValue(input[key]);
	}

	return output;

}

/*
 * Does the actual deep merging.
 */
function executeDeepMerge (target, _objects = [], _options = {}) {

	const options = {
		arrayBehaviour: _options.arrayBehaviour || 'replace',  // Can be "merge" or "replace".
	};

	// Ensure we have actual objects for each.
	const objects = _objects.map(object => object || {});
	const output = target || {};

	// Enumerate the objects and their keys.
	for (let oindex = 0; oindex < objects.length; oindex++) {
		const object = objects[oindex];
		const keys = Object.keys(object);

		for (let kindex = 0; kindex < keys.length; kindex++) {
			const key = keys[kindex];
			const value = object[key];
			const type = getTypeOf(value);
			const existingValueType = getTypeOf(output[key]);

			if (type === 'object') {
				if (existingValueType !== 'undefined') {
					const existingValue = (existingValueType === 'object' ? output[key] : {});
					output[key] = executeDeepMerge({}, [existingValue, quickCloneObject(value)], options);
				}
				else {
					output[key] = quickCloneObject(value);
				}
			}

			else if (type === 'array') {
				if (existingValueType === 'array') {
					const newValue = quickCloneArray(value);
					output[key] = (options.arrayBehaviour === 'merge' ? output[key].concat(newValue) : newValue);
				}
				else {
					output[key] = quickCloneArray(value);
				}
			}

			else {
				output[key] = value;
			}

		}
	}

	return output;

}

/*
 * Merge all the supplied objects into the target object, breaking all references, including those of nested objects
 * and arrays, and even objects nested inside arrays. The first parameter is not mutated unlike Object.assign().
 * Properties in later objects will always overwrite.
 */
module.exports = function objectAssignDeep (target, ...objects) {
	return executeDeepMerge(target, objects);
};

/*
 * Same as objectAssignDeep() except it doesn't mutate the target object and returns an entirely new object.
 */
module.exports.noMutate = function objectAssignDeepInto (...objects) {
	return executeDeepMerge({}, objects);
};

/*
 * Allows an options object to be passed in to customise the behaviour of the function.
 */
module.exports.withOptions = function objectAssignDeepInto (target, objects, options) {
	return executeDeepMerge(target, objects, options);
};


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Path", function() { return Path; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_search_params__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_search_params___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_search_params__);


/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

var defaultOrConstrained = function (match) {
    return '(' +
        (match ? match.replace(/(^<|>$)/g, '') : "[a-zA-Z0-9-_.~%':|=+\\*@]+") +
        ')';
};
var rules = [
    {
        name: 'url-parameter',
        pattern: /^:([a-zA-Z0-9-_]*[a-zA-Z0-9]{1})(<(.+?)>)?/,
        regex: function (match) {
            return new RegExp(defaultOrConstrained(match[2]));
        }
    },
    {
        name: 'url-parameter-splat',
        pattern: /^\*([a-zA-Z0-9-_]*[a-zA-Z0-9]{1})/,
        regex: /([^?]*)/
    },
    {
        name: 'url-parameter-matrix',
        pattern: /^;([a-zA-Z0-9-_]*[a-zA-Z0-9]{1})(<(.+?)>)?/,
        regex: function (match) {
            return new RegExp(';' + match[1] + '=' + defaultOrConstrained(match[2]));
        }
    },
    {
        name: 'query-parameter',
        pattern: /^(?:\?|&)(?::)?([a-zA-Z0-9-_]*[a-zA-Z0-9]{1})/
    },
    {
        name: 'delimiter',
        pattern: /^(\/|\?)/,
        regex: function (match) { return new RegExp('\\' + match[0]); }
    },
    {
        name: 'sub-delimiter',
        pattern: /^(!|&|-|_|\.|;)/,
        regex: function (match) { return new RegExp(match[0]); }
    },
    {
        name: 'fragment',
        pattern: /^([0-9a-zA-Z]+)/,
        regex: function (match) { return new RegExp(match[0]); }
    }
];

var tokenise = function (str, tokens) {
    if (tokens === void 0) { tokens = []; }
    // Look for a matching rule
    var matched = rules.some(function (rule) {
        var match = str.match(rule.pattern);
        if (!match) {
            return false;
        }
        tokens.push({
            type: rule.name,
            match: match[0],
            val: match.slice(1, 2),
            otherVal: match.slice(2),
            regex: rule.regex instanceof Function ? rule.regex(match) : rule.regex
        });
        if (match[0].length < str.length) {
            tokens = tokenise(str.substr(match[0].length), tokens);
        }
        return true;
    });
    // If no rules matched, throw an error (possible malformed path)
    if (!matched) {
        throw new Error("Could not parse path '" + str + "'");
    }
    return tokens;
};

var identity = function (_) { return _; };
var exists = function (val) { return val !== undefined && val !== null; };
var optTrailingSlash = function (source, strictTrailingSlash) {
    if (strictTrailingSlash) {
        return source;
    }
    if (source === '\\/') {
        return source;
    }
    return source.replace(/\\\/$/, '') + '(?:\\/)?';
};
var upToDelimiter = function (source, delimiter) {
    if (!delimiter) {
        return source;
    }
    return /(\/)$/.test(source) ? source : source + '(\\/|\\?|\\.|;|$)';
};
var appendQueryParam = function (params, param, val) {
    if (val === void 0) { val = ''; }
    var existingVal = params[param];
    if (existingVal === undefined) {
        params[param] = val;
    }
    else {
        params[param] = Array.isArray(existingVal)
            ? existingVal.concat(val)
            : [existingVal, val];
    }
    return params;
};
var Path = /** @class */ (function () {
    function Path(path) {
        if (!path) {
            throw new Error('Missing path in Path constructor');
        }
        this.path = path;
        this.tokens = tokenise(path);
        this.hasUrlParams =
            this.tokens.filter(function (t) { return /^url-parameter/.test(t.type); }).length > 0;
        this.hasSpatParam =
            this.tokens.filter(function (t) { return /splat$/.test(t.type); }).length > 0;
        this.hasMatrixParams =
            this.tokens.filter(function (t) { return /matrix$/.test(t.type); }).length > 0;
        this.hasQueryParams =
            this.tokens.filter(function (t) { return /^query-parameter/.test(t.type); }).length > 0;
        // Extract named parameters from tokens
        this.spatParams = this.getParams('url-parameter-splat');
        this.urlParams = this.getParams(/^url-parameter/);
        // Query params
        this.queryParams = this.getParams('query-parameter');
        // All params
        this.params = this.urlParams.concat(this.queryParams);
        // Check if hasQueryParams
        // Regular expressions for url part only (full and partial match)
        this.source = this.tokens
            .filter(function (t) { return t.regex !== undefined; })
            .map(function (r) { return r.regex.source; })
            .join('');
    }
    Path.createPath = function (path) {
        return new Path(path);
    };
    Path.prototype.isQueryParam = function (name) {
        return this.queryParams.indexOf(name) !== -1;
    };
    Path.prototype.test = function (path, opts) {
        var _this = this;
        var options = __assign({ strictTrailingSlash: false, queryParams: {} }, opts);
        // trailingSlash: falsy => non optional, truthy => optional
        var source = optTrailingSlash(this.source, options.strictTrailingSlash);
        // Check if exact match
        var match = this.urlTest(path, source + (this.hasQueryParams ? '(\\?.*$|$)' : '$'), opts);
        // If no match, or no query params, no need to go further
        if (!match || !this.hasQueryParams) {
            return match;
        }
        // Extract query params
        var queryParams = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_search_params__["parse"])(path, options.queryParams);
        var unexpectedQueryParams = Object.keys(queryParams).filter(function (p) { return !_this.isQueryParam(p); });
        if (unexpectedQueryParams.length === 0) {
            // Extend url match
            Object.keys(queryParams).forEach(function (p) { return (match[p] = queryParams[p]); });
            return match;
        }
        return null;
    };
    Path.prototype.partialTest = function (path, opts) {
        var _this = this;
        var options = __assign({ delimited: true, queryParams: {} }, opts);
        // Check if partial match (start of given path matches regex)
        // trailingSlash: falsy => non optional, truthy => optional
        var source = upToDelimiter(this.source, options.delimited);
        var match = this.urlTest(path, source, options);
        if (!match) {
            return match;
        }
        if (!this.hasQueryParams) {
            return match;
        }
        var queryParams = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_search_params__["parse"])(path, options.queryParams);
        Object.keys(queryParams)
            .filter(function (p) { return _this.isQueryParam(p); })
            .forEach(function (p) { return appendQueryParam(match, p, queryParams[p]); });
        return match;
    };
    Path.prototype.build = function (params, opts) {
        var _this = this;
        if (params === void 0) { params = {}; }
        var options = __assign({ ignoreConstraints: false, ignoreSearch: false, queryParams: {} }, opts);
        var encodedUrlParams = Object.keys(params)
            .filter(function (p) { return !_this.isQueryParam(p); })
            .reduce(function (acc, key) {
            if (!exists(params[key])) {
                return acc;
            }
            var val = params[key];
            var encode = _this.isQueryParam(key) ? identity : encodeURI;
            if (typeof val === 'boolean') {
                acc[key] = val;
            }
            else if (Array.isArray(val)) {
                acc[key] = val.map(encode);
            }
            else {
                acc[key] = encode(val);
            }
            return acc;
        }, {});
        // Check all params are provided (not search parameters which are optional)
        if (this.urlParams.some(function (p) { return !exists(params[p]); })) {
            var missingParameters = this.urlParams.filter(function (p) { return !exists(params[p]); });
            throw new Error("Cannot build path: '" +
                this.path +
                "' requires missing parameters { " +
                missingParameters.join(', ') +
                ' }');
        }
        // Check constraints
        if (!options.ignoreConstraints) {
            var constraintsPassed = this.tokens
                .filter(function (t) {
                return /^url-parameter/.test(t.type) && !/-splat$/.test(t.type);
            })
                .every(function (t) {
                return new RegExp('^' + defaultOrConstrained(t.otherVal[0]) + '$').test(encodedUrlParams[t.val]);
            });
            if (!constraintsPassed) {
                throw new Error("Some parameters of '" + this.path + "' are of invalid format");
            }
        }
        var base = this.tokens
            .filter(function (t) { return /^query-parameter/.test(t.type) === false; })
            .map(function (t) {
            if (t.type === 'url-parameter-matrix') {
                return ";" + t.val + "=" + encodedUrlParams[t.val[0]];
            }
            return /^url-parameter/.test(t.type)
                ? encodedUrlParams[t.val[0]]
                : t.match;
        })
            .join('');
        if (options.ignoreSearch) {
            return base;
        }
        var searchParams = this.queryParams
            .filter(function (p) { return Object.keys(params).indexOf(p) !== -1; })
            .reduce(function (sparams, paramName) {
            sparams[paramName] = params[paramName];
            return sparams;
        }, {});
        var searchPart = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_search_params__["build"])(searchParams, options.queryParams);
        return searchPart ? base + '?' + searchPart : base;
    };
    Path.prototype.getParams = function (type) {
        var predicate = type instanceof RegExp
            ? function (t) { return type.test(t.type); }
            : function (t) { return t.type === type; };
        return this.tokens.filter(predicate).map(function (t) { return t.val[0]; });
    };
    Path.prototype.urlTest = function (path, source, _a) {
        var _this = this;
        var _b = (_a === void 0 ? {} : _a).caseSensitive, caseSensitive = _b === void 0 ? false : _b;
        var regex = new RegExp('^' + source, caseSensitive ? '' : 'i');
        var match = path.match(regex);
        if (!match) {
            return null;
        }
        else if (!this.urlParams.length) {
            return {};
        }
        // Reduce named params to key-value pairs
        return match
            .slice(1, this.urlParams.length + 1)
            .reduce(function (params, m, i) {
            params[_this.urlParams[i]] = decodeURIComponent(m);
            return params;
        }, {});
    };
    return Path;
}());

/* harmony default export */ __webpack_exports__["default"] = (Path);



/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t(__webpack_require__(0));else if("function"==typeof define&&define.amd)define(["react"],t);else{var n=t("object"==typeof exports?require("react"):e.React);for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(this,function(e){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.format=void 0;var a=function(){function e(e,t){for(var n=0;t.length>n;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(2),c=r(s),l=n(1),f=r(l),h={second:1e3,minute:6e4,hour:36e5,day:864e5,week:6048e5},p=function(e){function t(e){i(this,t);var n=u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.updateRelativeTime=n.updateRelativeTime.bind(n),n.checkForRelativeTimeProps=n.checkForRelativeTimeProps.bind(n),n.state={relativeTime:""},n.interval=null,n.currentUnit="",n}return o(t,e),a(t,[{key:"componentWillMount",value:function(){this.checkForRelativeTimeProps(this.props)}},{key:"componentWillReceiveProps",value:function(e){this.checkForRelativeTimeProps(e)}},{key:"getRelativeTimeString",value:function(e,t,n,r){var i=t%100===1||t%10===1?n:n+"s";return"second"===n&&0===e?"just now":"year"===n&&0===e?"this year":"year"===n&&1===e?"last year":(r?"will come in":"")+" "+t+" "+i+" "+(r?"":"ago")}},{key:"getRelativeTimeDiff",value:function(e){var t=e,n=new Date,r=t.getTime(),i=n.getTime(),u=i-r,o=n.getFullYear()-t.getFullYear(),a=Math[u>0?"floor":"ceil"];return{ms:u,seconds:a(u/h.second),minutes:a(u/h.minute),hours:a(u/h.hour),days:a(u/h.day),weeks:a(u/h.week),months:12*o+n.getMonth()-t.getMonth(),years:o}}},{key:"getInterval",value:function(){return this.currentUnit.length?h[this.currentUnit]?h[this.currentUnit]:h.week:10}},{key:"checkForRelativeTimeProps",value:function(e){var t=this;if(e.relativeTime&&this.isDate(e.value)){var n=new Date(e.value);this.updateRelativeTime(n,e.unit),this.interval&&window.clearInterval(this.interval),this.interval=setInterval(function(){return t.updateRelativeTime(n,e.unit)},this.getInterval())}}},{key:"updateRelativeTime",value:function(e,t){var n=this.getRelativeTimeDiff(e),r=this.currentUnit;if(this.currentUnit=t||this.bestFit(n),this.currentUnit!==r)return this.checkForRelativeTimeProps(this.props),!1;var i=n[this.currentUnit+"s"],u=Math.abs(i),o=0>i;if("second"===this.currentUnit){var a=45;45>u&&(a=20),20>u&&(a=5),5>u&&(a=0),0===u&&(a=0),i=o?-a:a,u=Math.abs(i)}return this.setState({relativeTime:this.getRelativeTimeString(i,u,this.currentUnit,o)}),!0}},{key:"bestFit",value:function(e){var t=Math.abs(e.seconds),n=Math.abs(e.minutes),r=Math.abs(e.hours),i=Math.abs(e.days),u=Math.abs(e.weeks),o=Math.abs(e.months),a=Math.abs(e.years);switch(!0){case a>0&&o>11:return"year";case o>0&&i>27:return"month";case u>0&&i>6:return"week";case i>0&&r>23:return"day";case r>0&&n>59:return"hour";case n>0&&t>59:return"minute";default:return"second"}}},{key:"isDate",value:function(e){var t=new Date(e);return"[object Date]"===Object.prototype.toString.call(t)&&!isNaN(t.getTime())}},{key:"render",value:function(){var e=this.props,t=e.value,n=e.format,r=e.placeholder,i=e.className,u=e.utc,o=e.relativeTime;return c.default.createElement("span",{className:i},this.isDate(t)?o?this.state.relativeTime:(0,f.default)(new Date(t),n,u):r)}}]),t}(s.Component);p.defaultProps={placeholder:"—",format:"d.m.Y H:i",utc:!1};t.format=f.default;t.default=p},function(e,t){"use strict";function n(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=new Date(e),i=["Sun","Mon","Tues","Wednes","Thurs","Fri","Satur","January","February","March","April","May","June","July","August","September","October","November","December"],u={},o=/\\?(.?)/gi,a=function(e,t){return u[e]?u[e]():t},s=function(e,t){for(var n=e+"";t>n.length;)n="0"+n;return n};return u={d:function(){return s(u.j(),2)},D:function(){return u.l().slice(0,3)},j:function(){return n?r.getUTCDate():r.getDate()},l:function(){return i[u.w()]+"day"},N:function(){return u.w()||7},S:function(){var e=u.j(),t=e%10;return t>3||1!==parseInt(e%100/10,10)||(t=0),["st","nd","rd"][t-1]||"th"},w:function(){return n?r.getUTCDay():r.getDay()},z:function(){var e=new Date(u.Y(),u.n()-1,u.j()),t=new Date(u.Y(),0,1);return Math.round((e-t)/864e5)},W:function(){var e=new Date(u.Y(),u.n()-1,u.j()-u.N()+3),t=void 0;return t=n?new Date(e.getUTCFullYear(),0,4):new Date(e.getFullYear(),0,4),s(1+Math.round((e-t)/864e5/7),2)},F:function(){return i[6+u.n()]},m:function(){return s(u.n(),2)},M:function(){return u.F().slice(0,3)},n:function(){return n?r.getUTCMonth()+1:r.getMonth()+1},t:function(){return n?new Date(u.Y(),u.n(),0).getUTCDate():new Date(u.Y(),u.n(),0).getDate()},L:function(){var e=u.Y();return e%4===0&&e%100!==0||e%400===0?1:0},o:function(){var e=u.n(),t=parseInt(u.W(),10),n=u.Y();return n+(12===e&&9>t?1:1===e&&t>9?-1:0)},Y:function(){return n?r.getUTCFullYear():r.getFullYear()},y:function(){return(""+u.Y()).slice(-2)},a:function(){return n?r.getUTCHours()>11?"pm":"am":r.getHours()>11?"pm":"am"},A:function(){return u.a().toUpperCase()},B:function(){var e=3600*r.getUTCHours(),t=60*r.getUTCMinutes(),n=r.getUTCSeconds();return s(Math.floor((e+t+n+3600)/86.4)%1e3,3)},g:function(){return u.G()%12||12},G:function(){return n?r.getUTCHours():r.getHours()},h:function(){return s(u.g(),2)},H:function(){return s(u.G(),2)},i:function(){return n?s(r.getUTCMinutes(),2):s(r.getMinutes(),2)},s:function(){return n?s(r.getUTCSeconds(),2):s(r.getSeconds(),2)},u:function(){return n?s(1e3*r.getUTCMilliseconds(),6):s(1e3*r.getMilliseconds(),6)},e:function(){throw Error("Not supported\n        (see source code of date() for timezone on how to add support)")},I:function(){var e=new Date(u.Y(),0),t=Date.UTC(u.Y(),0),n=new Date(u.Y(),6),r=Date.UTC(u.Y(),6);return e-t!==n-r?1:0},O:function(){var e=r.getTimezoneOffset(),t=Math.abs(e);return(e>0?"-":"+")+s(100*Math.floor(t/60)+t%60,4)},P:function(){var e=u.O();return e.substr(0,3)+":"+e.substr(3,2)},T:function(){return n?"UTC":"LOCAL"},Z:function(){return 60*-r.getTimezoneOffset()},c:function(){return"Y-m-d\\TH:i:sP".replace(o,a)},r:function(){return"D, d M Y H:i:s O".replace(o,a)},U:function(){return r/1e3|0}},t.replace(o,a)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},function(t,n){t.exports=e}])});

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//# sourceMappingURL=Operator.js.map

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

var makeOptions = function (opts) {
    if (opts === void 0) { opts = {}; }
    return ({
        arrayFormat: opts.arrayFormat || 'none',
        booleanFormat: opts.booleanFormat || 'none',
        nullFormat: opts.nullFormat || 'default'
    });
};
var encodeValue = function (value) { return encodeURIComponent(value); };
var decodeValue = function (value) { return decodeURIComponent(value); };
var encodeBoolean = function (name, value, opts) {
    if (opts.booleanFormat === 'empty-true' && value) {
        return name;
    }
    var encodedValue;
    if (opts.booleanFormat === 'unicode') {
        encodedValue = value ? '✓' : '✗';
    }
    else {
        encodedValue = value.toString();
    }
    return name + "=" + encodedValue;
};
var encodeNull = function (name, opts) {
    if (opts.nullFormat === 'hidden') {
        return '';
    }
    if (opts.nullFormat === 'string') {
        return name + "=null";
    }
    return name;
};
var getNameEncoder = function (opts) {
    if (opts.arrayFormat === 'index') {
        return function (name, index) { return name + "[" + index + "]"; };
    }
    if (opts.arrayFormat === 'brackets') {
        return function (name) { return name + "[]"; };
    }
    return function (name) { return name; };
};
var encodeArray = function (name, arr, opts) {
    var encodeName = getNameEncoder(opts);
    return arr
        .map(function (val, index) { return encodeName(name, index) + "=" + encodeValue(val); })
        .join('&');
};
var encode = function (name, value, opts) {
    if (value === null) {
        return encodeNull(name, opts);
    }
    if (typeof value === 'boolean') {
        return encodeBoolean(name, value, opts);
    }
    if (Array.isArray(value)) {
        return encodeArray(name, value, opts);
    }
    return name + "=" + encodeValue(value);
};
var decode = function (value, opts) {
    if (value === undefined) {
        return opts.booleanFormat === 'empty-true' ? true : null;
    }
    if (opts.booleanFormat === 'string') {
        if (value === 'true') {
            return true;
        }
        if (value === 'false') {
            return false;
        }
    }
    else if (opts.booleanFormat === 'unicode') {
        if (decodeValue(value) === '✓') {
            return true;
        }
        if (decodeValue(value) === '✗') {
            return false;
        }
    }
    else if (opts.nullFormat === 'string') {
        if (value === 'null') {
            return null;
        }
    }
    return decodeValue(value);
};

var getSearch = function (path) {
    var pos = path.indexOf('?');
    if (pos === -1) {
        return path;
    }
    return path.slice(pos + 1);
};
var isSerialisable = function (val) { return val !== undefined; };
var parseName = function (name) {
    var bracketPosition = name.indexOf('[');
    var hasBrackets = bracketPosition !== -1;
    return {
        hasBrackets: hasBrackets,
        name: hasBrackets ? name.slice(0, bracketPosition) : name
    };
};

/**
 * Parse a querystring and return an object of parameters
 */
var parse = function (path, opts) {
    var options = makeOptions(opts);
    return getSearch(path)
        .split('&')
        .reduce(function (params, param) {
        var _a = param.split('='), rawName = _a[0], value = _a[1];
        var _b = parseName(rawName), hasBrackets = _b.hasBrackets, name = _b.name;
        var currentValue = params[name];
        var decodedValue = decode(value, options);
        if (currentValue === undefined) {
            params[name] = hasBrackets ? [decodedValue] : decodedValue;
        }
        else {
            params[name] = [].concat(currentValue, decodedValue);
        }
        return params;
    }, {});
};
/**
 * Build a querystring from an object of parameters
 */
var build = function (params, opts) {
    var options = makeOptions(opts);
    return Object.keys(params)
        .filter(function (paramName) { return isSerialisable(params[paramName]); })
        .map(function (paramName) { return encode(paramName, params[paramName], options); })
        .filter(Boolean)
        .join('&');
};
/**
 * Remove a list of parameters from a querystring
 */
var omit = function (path, paramsToOmit, opts) {
    var options = makeOptions(opts);
    var searchPart = getSearch(path);
    if (searchPart === '') {
        return {
            querystring: '',
            removedParams: {}
        };
    }
    var _a = path.split('&').reduce(function (_a, chunk) {
        var left = _a[0], right = _a[1];
        var rawName = chunk.split('=')[0];
        var name = parseName(rawName).name;
        return paramsToOmit.indexOf(name) === -1
            ? [left.concat(chunk), right]
            : [left, right.concat(chunk)];
    }, [[], []]), kept = _a[0], removed = _a[1];
    return {
        querystring: kept.join('&'),
        removedParams: parse(removed.join('&'), options)
    };
};
/**
 * Remove a list of parameters from a querystring
 */
var keep = function (path, paramsToKeep, opts) {
    var options = makeOptions(opts);
    var searchPart = getSearch(path);
    if (searchPart === '') {
        return {
            keptParams: {},
            querystring: ''
        };
    }
    var _a = path.split('&').reduce(function (_a, chunk) {
        var left = _a[0], right = _a[1];
        var rawName = chunk.split('=')[0];
        var name = parseName(rawName).name;
        return paramsToKeep.indexOf(name) >= 0
            ? [left.concat(chunk), right]
            : [left, right.concat(chunk)];
    }, [[], []]), kept = _a[0], removed = _a[1];
    return {
        keptParams: parse(kept.join('&'), options),
        querystring: kept.join('&')
    };
};

exports.parse = parse;
exports.build = build;
exports.omit = omit;
exports.keep = keep;


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("qs");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("rxjs/Observable");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("rxjs/observable/of");

/***/ })
/******/ ]);