export default {
    height: 400,
    limiterConfig: {
        options: [10, 20, 50],
        default: 20
    },
    routes: {
        get: {
            route: '/posts',
            sort: 'id',
            dir: 'asc',
            resultPath: {
                data: 'data'
            }
        },
        delete: {
            route: '/posts/:id'
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
                    indexField: '@pageId'
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
            indexField: '@pageId',
            width: 30,
        },
        id: {
            label: 'ID',
            type: 'number',
            name: 'pageId',
            sortable: true,
            width: 150
        },
        title: {
            label: 'Title',
            type: 'string',
            name: 'title',
            sortable: true,
            textAlign: 'text-left',
            width: 500
        },
        status: {
            label: 'Status',
            type: 'options',
            name: 'status',
            textAlign: 'text-center',
            width: 150,
            options: {
                active: {
                    badge: 'bage-success',
                    value: 'Active',
                },
                inactive: {
                    badge: 'badge-danger',
                    value: 'Inactive'
                }
            }
        },
        createdAt: {
            label: 'Created',
            type: 'date',
            name: 'createdAt',
            sortable: true,
            textAlign: 'text-center',
            format: 'F j, Y',
            width: 150
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
                        id: '@pageId',
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
                        id: '@pageId'
                    }
                }
            }
        }
    }
}
