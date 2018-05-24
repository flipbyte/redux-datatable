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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
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
exports.createReducer = exports.createActionCreator = exports.getValueByPath = exports.paramsResolver = exports.getParam = exports.getConfigParam = exports.getSelectedKeys = exports.getUrl = exports.defaultLimiterCongig = undefined;

var _qs = __webpack_require__(5);

var _qs2 = _interopRequireDefault(_qs);

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

var getValueByPath = exports.getValueByPath = function getValueByPath(obj, path) {
    return path.reduce(function (acc, currVal) {
        return acc && acc[currVal] ? acc[currVal] : null;
    }, obj);
};

var createActionCreator = exports.createActionCreator = function createActionCreator(name, url) {
    return function (type) {
        return function (payload) {
            var action = { type: type, name: name, url: url, payload: payload };
            action.toString = function () {
                return type;
            };

            return action;
        };
    };
};

var createReducer = exports.createReducer = function createReducer(reducer, predicate) {
    return function (state, action) {
        return predicate(action) || state === undefined ? reducer(state, action) : state;
    };
};

/***/ }),
/* 3 */
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

var _String = __webpack_require__(17);

var _String2 = _interopRequireDefault(_String);

var _Number = __webpack_require__(16);

var _Number2 = _interopRequireDefault(_Number);

var _Date = __webpack_require__(15);

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var REQUEST_DATA = exports.REQUEST_DATA = 'REQUEST_DATA';
var RECEIVE_DATA = exports.RECEIVE_DATA = 'RECEIVE_DATA';
var REQUEST_DATA_CANCEL = exports.REQUEST_DATA_CANCEL = 'REQUEST_DATA_CANCEL';

var SET_PAGE = exports.SET_PAGE = 'SET_PAGE';
var SET_FILTER = exports.SET_FILTER = 'SET_FILTER';
var SET_SORT = exports.SET_SORT = 'SET_SORT';
var SET_LIMIT = exports.SET_LIMIT = 'SET_LIMIT';
var SET_SELECTION = exports.SET_SELECTION = 'SET_SELECTION';

var DELETE_DATA = exports.DELETE_DATA = 'DELETE_DATA';

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("qs");

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

var _Header = __webpack_require__(18);

var _Header2 = _interopRequireDefault(_Header);

var _Body = __webpack_require__(8);

var _Body2 = _interopRequireDefault(_Body);

var _Pagination = __webpack_require__(20);

var _Pagination2 = _interopRequireDefault(_Pagination);

var _Limiter = __webpack_require__(19);

var _Limiter2 = _interopRequireDefault(_Limiter);

var _Toolbar = __webpack_require__(22);

var _Toolbar2 = _interopRequireDefault(_Toolbar);

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
        { className: 'animated fadeIn' },
        _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
                'div',
                { className: 'col-12' },
                _react2.default.createElement(
                    'div',
                    { className: 'card' },
                    !!title && _react2.default.createElement(
                        'div',
                        { className: 'card-header' },
                        _react2.default.createElement('i', { className: 'fa fa-align-justify' }),
                        ' ',
                        title
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'card-block' },
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
                    )
                )
            )
        )
    );
};

Table.propTypes = {
    name: _propTypes2.default.string.isRequired,
    url: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.string,
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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Observable = __webpack_require__(28);

var _operator = __webpack_require__(25);

var _of = __webpack_require__(29);

var _normalizr = __webpack_require__(26);

var _qs = __webpack_require__(5);

var _qs2 = _interopRequireDefault(_qs);

var _utils = __webpack_require__(2);

var _actions = __webpack_require__(4);

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (props) {
    return function (Table) {
        var name = props.name,
            url = props.url,
            config = props.config,
            stateKeys = props.stateKeys,
            _props$limiterConfig = props.limiterConfig,
            limiterConfig = _props$limiterConfig === undefined ? _utils.defaultLimiterCongig : _props$limiterConfig;

        var WrappedTable = function (_Component) {
            _inherits(WrappedTable, _Component);

            function WrappedTable() {
                _classCallCheck(this, WrappedTable);

                return _possibleConstructorReturn(this, (WrappedTable.__proto__ || Object.getPrototypeOf(WrappedTable)).apply(this, arguments));
            }

            _createClass(WrappedTable, [{
                key: 'componentWillMount',
                value: function componentWillMount() {
                    var loadData = this.props.loadData;

                    loadData();
                }
            }, {
                key: 'setValidPage',
                value: function setValidPage(nextProps) {
                    if (nextProps.query.count <= 0) {
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
                    return _react2.default.createElement(Table, _extends({ name: name,
                        url: url,
                        config: config,
                        limiterConfig: limiterConfig
                    }, this.props));
                }
            }]);

            return WrappedTable;
        }(_react.Component);

        var initialState = {
            isFetching: false,
            title: "",
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
            selection: {}
        };

        var tableReducer = function tableReducer() {
            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
            var action = arguments[1];

            var payload = _objectWithoutProperties(action.payload, []);

            switch (action.type) {
                case actions.REQUEST_DATA:
                    return _extends({}, state, {
                        isFetching: true
                    });

                case actions.RECEIVE_DATA:
                    return _extends({}, state, {
                        isFetching: false,
                        query: _extends({}, state.query, {
                            count: parseInt(payload.response.total)
                        }),
                        items: payload.data.result,
                        selection: {}
                    });

                case actions.SET_PAGE:
                    var offset = (payload.page - 1) * state.query.limit;
                    offset = offset > 0 ? offset : 0;

                    return _extends({}, state, {
                        query: _extends({}, state.query, {
                            page: payload.page,
                            offset: offset
                        })
                    });

                case actions.SET_SORT:
                    return _extends({}, state, {
                        query: _extends({}, state.query, {
                            sort: payload.sort,
                            dir: payload.dir
                        })
                    });

                case actions.SET_LIMIT:
                    return _extends({}, state, {
                        query: _extends({}, state.query, {
                            limit: parseInt(payload.limit),
                            offset: (state.query.page - 1) * state.query.limit
                        })
                    });

                case actions.SET_FILTER:
                    return _extends({}, state, {
                        query: _extends({}, state.query, {
                            search: _extends({}, state.query.search, _defineProperty({}, payload.key, payload.filter))
                        })
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

                    return _extends({}, state, {
                        selection: _extends({}, state.selection, _defineProperty({}, payload.paramKey, _extends({}, state.selection[payload.paramKey], selection)))
                    });

                default:
                    return state;
            }
        };

        var tableEpics = function tableEpics(name, url, stateKeys, actionsCreators) {
            var setParamsEpic = function setParamsEpic(action$, store) {
                return action$.ofType(actionsCreators.setPage().toString(), actionsCreators.setFilter().toString(), actionsCreators.setLimit().toString(), actionsCreators.setSort().toString()).concatMap(function (action) {
                    return _Observable.Observable.of(actionsCreators.cancelRequest({ name: name }), actionsCreators.requestData({ query: (0, _utils.getValueByPath)(store.getState(), stateKeys).query }));
                });
            };

            var fetchDataEpic = function fetchDataEpic(action$, store, _ref) {
                var getJSONSecure = _ref.getJSONSecure,
                    schemas = _ref.schemas;
                return action$.ofType(actionsCreators.requestData().toString()).switchMap(function (action) {
                    return getJSONSecure(url + '?' + _qs2.default.stringify(action.payload.query)).map(function (response) {
                        var data = (0, _normalizr.normalize)(response.data, [schemas[name]]);
                        return actionsCreators.receiveData({ response: response, data: data });
                    }).takeUntil(action$.ofType(actionsCreators.cancelRequest().toString()).filter(function (cancelAction) {
                        return cancelAction.payload.name == name;
                    }));
                });
            };

            return { setParamsEpic: setParamsEpic, fetchDataEpic: fetchDataEpic };
        };

        var reducer = (0, _utils.createReducer)(tableReducer, function (action) {
            return action.name === name;
        });

        var actionCreator = (0, _utils.createActionCreator)(name, url);
        var actionCreators = {
            cancelRequest: actionCreator(actions.REQUEST_DATA_CANCEL),
            requestData: actionCreator(actions.REQUEST_DATA),
            receiveData: actionCreator(actions.RECEIVE_DATA),
            setPage: actionCreator(actions.SET_PAGE),
            setSort: actionCreator(actions.SET_SORT),
            setLimit: actionCreator(actions.SET_LIMIT),
            setFilter: actionCreator(actions.SET_FILTER),
            setSelection: actionCreator(actions.SET_SELECTION),
            deleteData: actionCreator(actions.DELETE_DATA)
        };

        var epics = tableEpics(name, url, stateKeys, actionCreators);

        return {
            WrappedTable: WrappedTable,
            reducer: reducer,
            epics: epics,
            actionCreators: actionCreators
        };
    };
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Renderer = __webpack_require__(10);

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
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Text = __webpack_require__(14);

var _Text2 = _interopRequireDefault(_Text);

var _Date = __webpack_require__(12);

var _Date2 = _interopRequireDefault(_Date);

var _Actions = __webpack_require__(11);

var _Actions2 = _interopRequireDefault(_Actions);

var _Selection = __webpack_require__(13);

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
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactPureTime = __webpack_require__(27);

var _reactPureTime2 = _interopRequireDefault(_reactPureTime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Date = function Date(_ref) {
    var index = _ref.index,
        data = _ref.data;
    return _react2.default.createElement(
        'td',
        null,
        _react2.default.createElement(_reactPureTime2.default, { value: data[index], format: 'F j, Y, g:i a' })
    );
};

exports.default = Date;

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
/* 14 */
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

var Text = function Text(_ref) {
    var index = _ref.index,
        data = _ref.data;
    return _react2.default.createElement(
        "td",
        null,
        " ",
        data[index],
        " "
    );
};

exports.default = Text;

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

var _Filter = __webpack_require__(3);

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

var _Filter = __webpack_require__(3);

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

var _Filter = __webpack_require__(3);

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
/* 18 */
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

var _Cell = __webpack_require__(9);

var _Cell2 = _interopRequireDefault(_Cell);

var _Filter = __webpack_require__(3);

var _Filter2 = _interopRequireDefault(_Filter);

var _Selection = __webpack_require__(21);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Limiter = function Limiter(_ref) {
    var options = _ref.options,
        setLimit = _ref.setLimit;
    return _react2.default.createElement(
        "label",
        { className: "limiter pull-right" },
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
/* 21 */
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

var _MassActions = __webpack_require__(23);

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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utils = exports.actions = exports.Table = undefined;

var _createTable = __webpack_require__(7);

var _createTable2 = _interopRequireDefault(_createTable);

var _Table = __webpack_require__(6);

var _Table2 = _interopRequireDefault(_Table);

var _actions = __webpack_require__(4);

var actions = _interopRequireWildcard(_actions);

var _utils = __webpack_require__(2);

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Table = _Table2.default;
exports.actions = actions;
exports.utils = utils;
exports.default = _createTable2.default;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//# sourceMappingURL=Operator.js.map

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("normalizr");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("react-pure-time");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("rxjs/Observable");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("rxjs/observable/of");

/***/ })
/******/ ]);