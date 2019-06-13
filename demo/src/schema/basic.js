import React from 'react';
import { MODIFY_DATA, REQUEST_DATA, IS_LOADING } from '../../../src/actions';

export default {
    name: 'posts',
    height: 400,
    rowHeight: 50,
    editing: false,
    primaryKey: 'pageId',
    routes: {
        get: {
            route: '/page',
            sort: 'id',
            dir: 'asc',
            resultPath: {
                data: 'data'
            }
        },
        delete: {
            route: '/users/:id'
        }
    },
    layout: [
        ['Editable'],
        ['MassActions', 'SimpleButton', 'ResetFilters', 'Spacer', 'Print', 'Columns'],
        ['Limiter', 'Spacer', 'ResultCount', 'Spacer', 'Pages'],
        [{ id: 'Table', layout: [
            ['Header'],
            ['Filters'],
            ['Body'],
            ['Header']
        ]}],
        ['Limiter', 'Spacer', 'ResultCount', 'Spacer', 'Pages'],
    ],
    components: {
        Editable: {
            type: 'editable',
            labels: {
                show: 'Make editable',
                hide: 'Hide editable',
                save: 'Save',
            },
            save: ( config ) => ( dispatch, getState ) => {
                const tableState = getState()[config.reducerName][config.name];
                console.log('toolbar save click with modified data', config, tableState.modified);
                config.action(MODIFY_DATA)({ clear: true });
                // Dispatch MODIFY_DATA action with clear: true, to reset the modified data
                // Dispatch REQUEST_DATA action "config.action(REQUEST_DATA)" to refresh data.
            },
            // renderer: ( props ) => {}
        },
        MassActions: {
            name: 'actions',
            label: 'Actions',
            id: 'dropdown',
            options: [{
                type: 'action',
                name: 'delete',
                label: 'Delete',
                indexField: '@id',
                thunk: ( config ) => ( dispatch, getState ) => {
                    // Get current table state.
                    const tableState = getState()[payload.reducerName][payload.name];
                    confirm('Are your sure you want to delete the selected items?')
                        ? console.log('delete items', config, getState(), tableState)
                        : console.log(false);

                    // Filter your selected item ids here for deletion
                    // You can find the selection data in the selection key of the tableState.
                    // When all:true, exclude the ids in the selected object with value false and vice versa.
                }
            }, {
                type: 'action',
                name: 'edit',
                label: 'Edit this field',
                indexField: '@id'
            }]
        },
        SimpleButton: {
            type: 'button',
            label: 'Simple Button',
            state: false,
            thunk: ( config ) => ( dispatch, getState ) => {
                const tableState = getState()[config.reducerName][config.name];
                console.log('toolbar button click', config, tableState);
                config.action(REQUEST_DATA)();
                config.action(IS_LOADING)({ value: true });
                setTimeout(function() {
                    config.action(IS_LOADING)({ value: false });
                }, 1000);
            }
        },
        ResetFilters: {
            type: 'reset-filters',
            label: 'Reset Filters',
            state: false,
        },
        Print: {
            type: 'print',
            label: 'Print Table',
            state: false,
        },
        Columns: {
            name: 'columns',
            type: 'columns',
            label: 'Columns',
            visible: true,
            state: false
        },
        Limiter: {
            type: 'limiter',
            options: [10, 20, 50, 200, 2000, 0],
            default: 200,
        },
        Table: [{
            name: 'ids',
            label: '',
            sortable: false,
            type: 'selection',
            indexField: '@pageId',
            width: 50,
            extraData: 'selection'
        }, {
            label: 'ID',
            type: 'number',
            name: 'pageId',
            width: 150,
            filterable: true,
            sortable: true,
            // editable: true
        }, {
            label: 'ID',
            type: 'number',
            name: 'pageId',
            width: 150,
            filterable: true,
            sortable: true,
            // editable: true
        }, {
            label: 'ID',
            type: 'number',
            name: 'pageId',
            width: 150,
            filterable: true,
            sortable: true,
            // editable: true
        }, {
            label: 'ID',
            type: 'number',
            name: 'pageId',
            width: 150,
            filterable: true,
            sortable: true,
            // editable: true
        }, {
            label: 'ID',
            type: 'number',
            name: 'pageId',
            width: 150,
            filterable: true,
            sortable: true,
            // editable: true
        }, {
            label: "Status",
            type: "options",
            name: "entityData.data.status",
            sortable: true,
            filterable: true,
            textAlign: "center",
            width: 150,
            options: {
                "published": {
                    "label": "Published"
                },
                "draft": {
                    "label": "Draft"
                },
                "unpublished": {
                    "label": "Unpublished"
                },
                "pending-review": {
                    "label": "Pending Review"
                },
                "trashed": {
                    "label": "Trashed"
                },
                "archived": {
                    "label": "Archived"
                }
            },
            editable: true
            // renderer: ({
            //     data,
            //     colConfig: { name, options }
            // }) => <div>Not specified</div>
        }, {
            label: 'Created at',
            type: 'date',
            name: 'createdAt',
            sortable: true,
            textAlign: 'left',
            width: 200,
            editable: true,
            filterable: true,
        }, {
            label: 'Actions',
            type: 'actions',
            name: 'actions',
            width: 100,
            items: [{
                type: 'action',
                name: 'edit',
                label: 'Edit',
                htmlClass: 'btn btn-secondary',
                params: {
                    id: '@id',
                },
                thunk: ( config ) => ( dispatch, getState ) => {
                    console.log('edit', config, getState());
                }
            }, {
                type: 'action',
                name: 'delete',
                label: 'Delete',
                icon: 'trash-alt',
                params: {
                    id: '@id'
                },
                thunk: ( config ) => ( dispatch, getState ) => {
                    confirm('Are your sure you want to delete this page?')
                        ? console.log('delete', getState())
                        : console.log(false);

                }
            }]
        }]
    }
    // styles: {
    //     loader: {
    //         mask: {
    //             backgroundColor: 'red',
    //         },
    //         spinner: {
    //             borderTopColor: 'black',
    //         }
    //     },
    //     tableContainer: {
    //         fontSize: '16px',
    //     },
    //     // table: {
    //     //     background: '#000',
    //     // },
    //     // thead: {
    //     //     background: '#000'
    //     // },
    //     // tbody: {
    //     //     background: '#000'
    //     // },
    //     // tr: {
    //     //     header: { fontWeight: 'normal' },
    //     //     filter: { },
    //     //     body: { },
    //     // },
    //     // th: { textAlign: 'center', ':last-child': {
    //     //     textAlign: 'right'
    //     // }},
    //     // td: {
    //     //      filter: {},
    //     //      body: { textAlign: 'center', ':last-child': {
    //     //          textAlign: 'right'
    //     //      }}
    //     // },
    //     toolbar: {
    //         // item: {
    //         //     backgroundColor: '#000',
    //         // },
    //         // containr:
    //         // row:
    //         // item:
    //         item: {
    //             actions: {
    //                 marginRight: '5px'
    //             },
    //             columns: {
    //                 float: 'right',
    //                 'button': {
    //                     background: '#fff',
    //                     color: '#6c757d'
    //                 },
    //                 '> div > div': {
    //                     right: 0,
    //                     left: ''
    //                 }
    //             }
    //         }
    //     },
    //     pagination: {
    //         // container:
    //         // item:
    //         // items: {
    //         //     [name]:
    //         // },
    //         item: {
    //             pages: {
    //                 float: 'right',
    //             }
    //         }
    //     },
    //     filter: {
    //         // pageId: {' input': {
    //         //     border: '1px solid #000'
    //         // }}
    //         // [name]:
    //     },
    //     body: {
    //         actions: {
    //             ' button': {
    //                 fontSize: '12px',
    //                 ':last-child': {
    //                     background: '#dc3545',
    //                     color: '#fff',
    //                     ':hover': {
    //                         backgroundColor: '#c82333',
    //                     }
    //                 }
    //             }
    //         }
    //         // [name]:
    //     }
    // },
    // pagination: {
    //     // visible: true, // or an object { top: true, bottom: false } default visible
    //     items: {
    //         limiter: {
    //             type: 'limiter',
    //             visible: true,
    //             position: 10,
    //             options: [10, 20, 50, 200, 2000, 0],
    //             default: 200,
    //         },
    //         pages: {
    //             type: 'pages',
    //             visible: true,
    //             position: 20,
    //             right: true,
    //         },
    //         resultCount: {
    //             type: 'resultCount',
    //             visible: true,
    //             position: 30,
    //             right: true,
    //         },
    //     }
    // },
    // toolbar: [
    //     [{
    //         name: 'actions',
    //         label: 'Actions',
    //         id: 'dropdown',
    //         options: [{
    //             type: 'action',
    //             name: 'delete',
    //             label: 'Delete',
    //             indexField: '@id',
    //             thunk: ( config ) => ( dispatch, getState ) => {
    //                 // Get current table state.
    //                 const tableState = getState()[payload.reducerName][payload.name];
    //                 confirm('Are your sure you want to delete the selected items?')
    //                     ? console.log('delete items', config, getState(), tableState)
    //                     : console.log(false);
    //
    //                 // Filter your selected item ids here for deletion
    //                 // You can find the selection data in the selection key of the tableState.
    //                 // When all:true, exclude the ids in the selected object with value false and vice versa.
    //             }
    //         }, {
    //             type: 'action',
    //             name: 'edit',
    //             label: 'Edit this field',
    //             indexField: '@id'
    //         }],
    //         visible: true
    //     }, {
    //         type: 'button',
    //         label: 'Simple Button',
    //         visible: true,
    //         state: false,
    //         thunk: ( config ) => ( dispatch, getState ) => {
    //             const tableState = getState()[config.reducerName][config.name];
    //             console.log('toolbar button click', config, tableState);
    //             config.action(REQUEST_DATA)();
    //             config.action(IS_LOADING)({ value: true });
    //             setTimeout(function() {
    //                 config.action(IS_LOADING)({ value: false });
    //             }, 1000);
    //         }
    //     }, {
    //         type: 'resetFilters',
    //         label: 'Reset Filters',
    //         visible: true,
    //         state: false,
    //     }, {
    //         type: 'print',
    //         label: 'Print Table',
    //         visible: true,
    //         state: false,
    //     }, {
    //         name: 'columns',
    //         type: 'columns',
    //         label: 'Columns',
    //         visible: true,
    //         state: false
    //     }, {
    //         name: 'editable',
    //         type: 'editable',
    //         labels: {
    //             show: 'Make editable',
    //             hide: 'Hide editable',
    //             save: 'Save',
    //         },
    //         save: ( config ) => ( dispatch, getState ) => {
    //             const tableState = getState()[config.reducerName][config.name];
    //             console.log('toolbar save click with modified data', config, tableState.modified);
    //             config.action(MODIFY_DATA)({ clear: true });
    //             // Dispatch MODIFY_DATA action with clear: true, to reset the modified data
    //             // Dispatch REQUEST_DATA action "config.action(REQUEST_DATA)" to refresh data.
    //         }
    //     }],
    // ],
    // columns: [{
    //     name: 'ids',
    //     label: '',
    //     sortable: false,
    //     type: 'selection',
    //     indexField: '@pageId',
    //     width: 50,
    //     extraData: 'selection'
    // }, {
    //     label: 'ID',
    //     type: 'number',
    //     name: 'pageId',
    //     width: 150,
    //     filterable: true,
    //     sortable: true,
    //     // editable: true
    // }, {
    //     label: "Status",
    //     type: "options",
    //     name: "entityData.data.status",
    //     sortable: true,
    //     filterable: true,
    //     textAlign: "center",
    //     width: 150,
    //     options: {
    //         "published": {
    //             "label": "Published"
    //         },
    //         "draft": {
    //             "label": "Draft"
    //         },
    //         "unpublished": {
    //             "label": "Unpublished"
    //         },
    //         "pending-review": {
    //             "label": "Pending Review"
    //         },
    //         "trashed": {
    //             "label": "Trashed"
    //         },
    //         "archived": {
    //             "label": "Archived"
    //         }
    //     },
    //     editable: true
    //     // renderer: ({
    //     //     data,
    //     //     colConfig: { name, options }
    //     // }) => <div>Not specified</div>
    // }, {
    //     label: 'Created at',
    //     type: 'date',
    //     name: 'createdAt',
    //     sortable: true,
    //     textAlign: 'left',
    //     width: 200,
    //     editable: true,
    //     filterable: true,
    // }, {
    //     label: 'Actions',
    //     type: 'actions',
    //     name: 'actions',
    //     width: 100,
    //     items: [{
    //         type: 'action',
    //         name: 'edit',
    //         label: 'Edit',
    //         htmlClass: 'btn btn-secondary',
    //         params: {
    //             id: '@id',
    //         },
    //         thunk: ( config ) => ( dispatch, getState ) => {
    //             console.log('edit', config, getState());
    //         }
    //     }, {
    //         type: 'action',
    //         name: 'delete',
    //         label: 'Delete',
    //         icon: 'trash-alt',
    //         params: {
    //             id: '@id'
    //         },
    //         thunk: ( config ) => ( dispatch, getState ) => {
    //             confirm('Are your sure you want to delete this page?')
    //                 ? console.log('delete', getState())
    //                 : console.log(false);
    //
    //         }
    //     }]
    // }]
}
