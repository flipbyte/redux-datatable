export default {
    name: 'posts',
    height: 400,
    rowHeight: 50,
    filterable: true,
    headers: true,
    pagination: {
        // visible: true, // or an object { top: true, bottom: false } default visible
        items: [{
            type: 'limiter',
            visible: true,
            position: 10,
            options: [10, 20, 50, 200, 2000],
            default: 200,
            style: {
                right: false,
            }
        }, {
            type: 'pages',
            visible: true,
            position: 20,
            style: {
                right: true,
            }
        }, {
            type: 'resultCount',
            visible: true,
            position: 30,
            style: {
                width: '350px',
                textAlign: 'center',
            }
        }]
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
            visible: true,
            style: {
                right: false,
                width: '100px'
            }
        }, {
            type: 'reset-filters',
            label: 'Reset Filters',
            visible: true,
            state: false,
        }, {
            type: 'columns',
            label: 'Columns',
            visible: true,
            state: false,
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
        indexField: '@pageId',
        width: 50,
        extraData: 'selection'
    }, {
        label: 'ID',
        type: 'number',
        name: 'pageId',
        sortable: true,
        width: 150,
        filterable: true,
        sortable: true,
    }, /*{
        label: 'Avatar',
        type: 'image',
        name: 'avatar',
        sortable: false,
        textAlign: 'center',
        width: 200,
        filterable: false,
        imgHeight: 50
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
    },*/{
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
