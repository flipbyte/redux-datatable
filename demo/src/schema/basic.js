export default {
    name: 'posts',
    height: 400,
    rowHeight: 50,
    limiterConfig: {
        options: [10, 20, 50],
        default: 20
    },
    routes: {
        get: {
            route: '/users',
            sort: 'id',
            dir: 'asc',
            resultPath: {
                data: 'data',
                total: 'total'
            }
        },
        delete: {
            route: '/users/:id'
        }
    },
    toolbar: [
        [{
            label: 'Actions',
            id: 'dropdown',
            options: [{
                type: 'action',
                name: 'delete',
                label: 'Delete',
                indexField: '@id'
            }, {
                type: 'action',
                name: 'edit',
                label: 'Edit this field',
                indexField: '@id'
            }],
            visible: true,
            style: {
                right: false,
                width: '100px'
            }
        }, {
            type: 'reset-filters',
            label: 'Reset Filters',
            visible: true
        }, {
            type: 'columns',
            label: 'Columns',
            visible: true,
            style: {
                right: true
            }
        }/*, {
            label: 'NACTIONS',
            id: 'massActions',
            delete: {
                type: 'action',
                name: 'delete',
                label: 'Delete',
                indexField: '@id'
            },
            visible: true,
            style: {
                right: false,
                width: '200px'
            }
        }, {
            label: '2Actions',
            id: 'massActions',
            delete: {
                type: 'action',
                name: 'delete',
                label: 'Delete',
                indexField: '@id'
            },
            visible: true,
            style: {
                right: true,
                width: '100px'
            }
        }*/],
        // [{
        //     label: 'Actions',
        //     id: 'massActions',
        //     delete: {
        //         type: 'action',
        //         name: 'delete',
        //         label: 'Delete',
        //         indexField: '@id'
        //     },
        //     visible: true,
        //     style: {
        //         right: false,
        //         width: '200px'
        //     }
        // }, {
        //     type: 'columns',
        //     label: 'Columns',
        //     visible: true,
        // }, {
        //     label: 'NACTIONS',
        //     id: 'massActions',
        //     delete: {
        //         type: 'action',
        //         name: 'delete',
        //         label: 'Delete',
        //         indexField: '@id'
        //     },
        //     visible: true,
        //     style: {
        //         width: '200px'
        //     }
        // }, {
        //     label: '2Actions',
        //     id: 'massActions',
        //     delete: {
        //         type: 'action',
        //         name: 'delete',
        //         label: 'Delete',
        //         indexField: '@id'
        //     },
        //     visible: true,
        //     style: {
        //         right: true,
        //         width: '100px'
        //     }
        // }]
    ],
    // toolbar: {
    //     massActions: {
    //         label: 'Actions',
    //         delete: {
    //             type: 'action',
    //             name: 'delete',
    //             label: 'Delete',
    //             indexField: '@id'
    //         }
    //     },
    //     columns: true
    // },
    columns: [{
        name: 'ids',
        label: '',
        sortable: false,
        type: 'selection',
        indexField: '@id',
        width: 50,
        selection: true,
    }, {
        label: 'ID',
        type: 'number',
        name: 'id',
        sortable: true,
        width: 150,
        filterable: true,
        sortable: true,
    }, {
        label: 'First Name',
        type: 'string',
        name: 'first_name',
        sortable: true,
        textAlign: 'text-left',
        width: 200,
        filterable: true,
    }, {
        label: 'Last Name',
        type: 'string',
        name: 'last_name',
        sortable: true,
        textAlign: 'text-left',
        width: 200,
        filterable: true,
    }, {
        label: 'Actions',
        type: 'actions',
        name: 'actions',
        width: 100,
        children: {
            edit: {
                type: 'action',
                name: 'route',
                action: 'EDIT_PAGE',
                label: 'Edit',
                btnClass: 'btn btn-secondary',
                icon: 'edit',
                params: {
                    id: '@id',
                }
            },
            delete: {
                type: 'action',
                name: 'delete',
                label: 'Delete',
                action: 'DATA_DELETE',
                btnClass: 'btn btn-danger',
                icon: 'trash-alt',
                params: {
                    id: '@id'
                }
            }
        }
    }]
    // columns: {
    //     ids: {
    //         name: 'ids',
    //         label: '',
    //         sortable: false,
    //         type: 'selection',
    //         indexField: '@id',
    //         width: 50,
    //         selection: true,
    //     },
    //     id: {
    //         label: 'ID',
    //         type: 'number',
    //         name: 'id',
    //         sortable: true,
    //         width: 150,
    //         filterable: true,
    //         sortable: true,
    //     },
    //     first_name: {
    //         label: 'First Name',
    //         type: 'string',
    //         name: 'first_name',
    //         sortable: true,
    //         textAlign: 'text-left',
    //         width: 200,
    //         filterable: true,
    //     },
    //     last_name: {
    //         label: 'Last Name',
    //         type: 'string',
    //         name: 'last_name',
    //         sortable: true,
    //         textAlign: 'text-left',
    //         width: 200,
    //         filterable: true,
    //     },
    //     actions: {
    //         label: 'Actions',
    //         type: 'actions',
    //         name: 'actions',
    //         width: 100,
    //         children: {
    //             edit: {
    //                 type: 'action',
    //                 name: 'route',
    //                 action: 'EDIT_PAGE',
    //                 label: 'Edit',
    //                 btnClass: 'btn btn-secondary',
    //                 icon: 'edit',
    //                 params: {
    //                     id: '@id',
    //                 }
    //             },
    //             delete: {
    //                 type: 'action',
    //                 name: 'delete',
    //                 label: 'Delete',
    //                 action: 'DATA_DELETE',
    //                 btnClass: 'btn btn-danger',
    //                 icon: 'trash-alt',
    //                 params: {
    //                     id: '@id'
    //                 }
    //             }
    //         }
    //     }
    // }
}
