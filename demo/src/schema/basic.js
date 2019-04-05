export default {
    name: 'posts',
    height: 400,
    rowHeight: 50,
    filterable: true,
    headers: true,
    // styles: {
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
                options: [10, 20, 50, 200, 2000],
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
                    confirm("Are your sure you want to delete the selected items?")
                        ? console.log('delete items', getState())
                        : console.log(false);

                }
            }, {
                type: 'action',
                name: 'edit',
                label: 'Edit this field',
                indexField: '@id'
            }],
            visible: true
        }, {
            type: 'resetFilters',
            label: 'Reset Filters',
            visible: true,
            state: false,
        }, {
            name: 'columns',
            type: 'columns',
            label: 'Columns',
            visible: true,
            state: false
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
    }, {
        label: 'Created at',
        type: 'date',
        name: 'createdAt',
        sortable: true,
        textAlign: 'left',
        width: 200,
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
            btnClass: 'btn btn-secondary',
            icon: 'edit',
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
                confirm("Are your sure you want to delete this page?")
                    ? console.log('delete', getState())
                    : console.log(false);

            }
        }]
    }]
}
