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
    toolbar: {
        left: {
            massActions: {
                label: 'Actions',
                delete: {
                    type: 'action',
                    name: 'delete',
                    label: 'Delete',
                    indexField: '@id'
                }
            }
        },
        right: {
            columns: true,
        }
    },
    columns: {
        ids: {
            name: 'ids',
            label: '',
            sortable: false,
            type: 'selection',
            indexField: '@id',
            width: 50,
        },
        id: {
            label: 'ID',
            type: 'number',
            name: 'id',
            sortable: true,
            width: 150
        },
        first_name: {
            label: 'First Name',
            type: 'string',
            name: 'first_name',
            sortable: true,
            textAlign: 'text-left',
            width: 200
        },
        last_name: {
            label: 'Last Name',
            type: 'string',
            name: 'last_name',
            sortable: true,
            textAlign: 'text-left',
            width: 200
        },
        actions: {
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
        }
    }
}
