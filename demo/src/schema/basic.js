import React from 'react';
import { MODIFY_DATA, REQUEST_DATA, SET_IS_LOADING } from '../../../src/actions';
import { getItemIds } from '../../../src/utils';

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
        // Loader: {
        //     // styles: {
        //     //     mask: {
        //     //         backgroundColor: 'red',
        //     //     },
        //     //     spinner: {
        //     //         borderTopColor: 'black',
        //     //     }
        //     // }
        // },
        ResultCount: {
            styles: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }
        },
        // Pages: {
        //     styles: {
        //         first: { backgroundColor: 'red' },
        //         previous: { backgroundColor: 'green' },
        //         pageNumber: { backgroundColor: 'yellow' },
        //         next: { backgroundColor: 'pink' },
        //         last: { backgroundColor: 'purple' },
        //     }
        // },
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
            // styles: {
            //     show: { backgroundColor: 'blue' },
            //     hide: { backgroundColor: 'black', color: 'white'},
            //     save: { backgroundColor: 'green' }
            // }
            // renderer: ( props ) => {}
        },
        MassActions: {
            name: 'actions',
            label: 'Actions',
            id: 'dropdown',
            // styles: {
            //     button: {
            //         backgroundColor: '#aaa'
            //     },
            //     dropdownMenu: {
            //         backgroundColor: 'magento'
            //     },
            //     dropdownItem: {
            //         backgroundColor: 'pink'
            //     }
            // },
            options: [{
                type: 'action',
                name: 'delete',
                label: 'Delete',
                styles: {
                    backgroundColor: 'red',
                },
                thunk: ( config ) => ( dispatch, getState ) => {
                    // Get current table state.
                    const tableState = getState()[config.reducerName][config.name];
                    console.log(config, tableState);
                    console.log(getItemIds(tableState.selection, tableState.items, config.primaryKey/*, config.entity.schema*/));
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
            }]
        },
        SimpleButton: {
            type: 'button',
            label: 'Simple Button',
            thunk: ( config ) => ( dispatch, getState ) => {
                const tableState = getState()[config.reducerName][config.name];
                console.log('toolbar button click', config, tableState);
                config.action(REQUEST_DATA)();
                config.action(SET_IS_LOADING)({ value: true });
                setTimeout(function() {
                    config.action(SET_IS_LOADING)({ value: false });
                }, 1000);
            },
            // styles: {
            //     backgroundColor: 'green',
            //     color: 'white'
            // }
        },
        ResetFilters: {
            type: 'reset-filters',
            label: 'Reset Filters',
            // styles: {
            //     backgroundColor: 'red',
            //     color: 'white'
            // }
        },
        Print: {
            type: 'print',
            label: 'Print Table',
            // styles: {
            //     backgroundColor: 'yellow',
            // }
        },
        Columns: {
            name: 'columns',
            type: 'columns',
            label: 'Columns',
            // styles: {
            //     button: {
            //         backgroundColor: '#aaa'
            //     },
            //     dropdownMenu: {
            //         backgroundColor: 'magento'
            //     },
            //     dropdownItem: {
            //         backgroundColor: 'pink'
            //     }
            // }
        },
        Limiter: {
            type: 'limiter',
            options: [10, 20, 50, 100, 150, 200, 500, 1000, 2000, 5000, 10000, 0],
            default: 200,
            // styles: {}
        },
        Table: {
            styles: {
                // table: {
                //     background: '#000',
                // },
                // thead: {
                //     background: '#000'
                // },
                // filters: {
                //     background: 'blue'
                // },
                // // tbody: {
                // //     background: '#000'
                // // },
                // tr: {
                //     header: { fontWeight: 'normal' },
                //     filters: { background: 'green' },
                //     body: { },
                // },
                // // th: {
                // //     background: 'red',
                // //     textAlign: 'center',
                // //     ':last-child': {
                // //         textAlign: 'right'
                // //     }
                // // },
                // td: {
                //     filters: { backgroundColor: '#000' },
                //     // body: {
                //     //     color: '#fff',
                //     //     textAlign: 'center',
                //     //     ':last-child': {
                //     //         textAlign: 'right'
                //     //     }
                //     // }
                // },
            },
            columns: [{
                name: 'pageId',
                label: '',
                sortable: false,
                type: 'selection',
                // indexField: '@pageId',
                width: 50,
                extraData: 'selection',
            },  {
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
            },{
                label: 'ID',
                type: 'number',
                name: 'pageId',
                width: 150,
                filterable: true,
                sortable: true,
                // editable: true
            },{
                label: 'ID',
                type: 'number',
                name: 'pageId',
                width: 150,
                filterable: true,
                sortable: true,
                // editable: true
            },{
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
            },{
                label: 'Status',
                type: 'options',
                name: 'entityData.data.status',
                sortable: true,
                filterable: true,
                textAlign: 'center',
                width: 150,
                options: {
                    published: {
                        'label': 'Published'
                    },
                    draft: {
                        'label': 'Draft'
                    },
                    unpublished: {
                        'label': 'Unpublished'
                    },
                    'pending-review': {
                        'label': 'Pending Review'
                    },
                    trashed: {
                        'label': 'Trashed'
                    },
                    archived: {
                        'label': 'Archived'
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
                width: 130,
                name: 'pageId',
                items: [{
                    type: 'action',
                    name: 'edit',
                    label: 'Edit',
                    htmlClass: 'btn btn-secondary',
                    thunk: ( config ) => ( dispatch, getState ) => {
                        console.log('edit', config, getState());
                    }
                }, {
                    type: 'action',
                    name: 'delete',
                    label: 'Delete',
                    icon: 'trash-alt',
                    styles: {
                        backgroundColor: 'red',
                        color: 'white'
                    },
                    thunk: ( config ) => ( dispatch, getState ) => {
                        confirm('Are your sure you want to delete this page?')
                            ? console.log('delete', getState())
                            : console.log(false);

                    }
                }]
            }]
        }
    }
}
