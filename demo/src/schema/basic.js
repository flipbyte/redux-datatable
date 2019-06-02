import React from 'react';

export default {
    name: 'posts',
    height: 400,
    rowHeight: 50,
    filterable: true,
    headers: true,
    isEditable: true,
    isEditing: false,
    primaryKey: 'pageId',
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
    pagination: {
        // visible: true, // or an object { top: true, bottom: false } default visible
        items: {
            limiter: {
                type: 'limiter',
                visible: true,
                position: 10,
                options: [10, 20, 50, 200, 2000, 0],
                default: 200,
            },
            pages: {
                type: 'pages',
                visible: true,
                position: 20,
                right: true,
            },
            resultCount: {
                type: 'resultCount',
                visible: true,
                position: 30,
                right: true,
            },
        }
    },
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
    toolbar: [
        [{
            name: 'actions',
            label: 'Actions',
            id: 'dropdown',
            options: [{
                type: 'action',
                name: 'delete',
                label: 'Delete',
                indexField: '@id',
                thunk: ( payload ) => ( dispatch, getState ) => {
                    // Get current table state.
                    const tableState = getState()[payload.reducerName][payload.name];
                    confirm('Are your sure you want to delete the selected items?')
                        ? console.log('delete items', payload, getState(), tableState)
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
            }],
            visible: true
        }, {
            type: 'button',
            label: 'Simple Button',
            visible: true,
            state: false,
            thunk: ( payload ) => ( dispatch, getState ) => {
                console.log('toolbar button click', payload);
            }
        }, {
            type: 'resetFilters',
            label: 'Reset Filters',
            visible: true,
            state: false,
        }, {
            type: 'print',
            label: 'Print Table',
            visible: true,
            state: false,
        }, {
            name: 'columns',
            type: 'columns',
            label: 'Columns',
            visible: true,
            state: false
        }, {
            name: 'editable',
            type: 'editable',
            editableLabel: {
                0: 'Make editable',
                1: 'Hide editable'
            },
            saveLabel: 'Save',
            save: ( payload ) => ( dispatch, getState ) => {
                const tableState = getState()[payload.reducerName][payload.name];
                console.log('toolbar save click with modified data', payload, tableState.modified);
                // Dispatch MODIFY_DATA action with clear: true, to reset the modified data
                // Dispatch REQUEST_DATA action "payload.action(REQUEST_DATA)" to refresh data.
            }
        }],
    ],
    columns: [{
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
        // isEditable: true
    }, {
        label: "Status",
        type: "options",
        name: "entityData.data.status",
        sortable: true,
        filterable: true,
        textAlign: "center",
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
        isEditable: true
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
        isEditable: true,
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
            thunk: ( payload ) => ( dispatch, getState ) => {
                console.log('edit', payload, getState());
            }
        }, {
            type: 'action',
            name: 'delete',
            label: 'Delete',
            icon: 'trash-alt',
            params: {
                id: '@id'
            },
            thunk: ( payload ) => ( dispatch, getState ) => {
                confirm('Are your sure you want to delete this page?')
                    ? console.log('delete', getState())
                    : console.log(false);

            }
        }]
    }]
}
