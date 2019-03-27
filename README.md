# @flipbyte/redux-datatable

[Developed by Flipbyte](https://www.flipbyte.com/)

[![npm package][npm-badge]][npm]

Datatable built using React and Redux to fetch JSON data asynchronously using REST API.

- Filterable columns by date ranges, numeric ranges and text.
- Pagination
- Sortable columns
- Configurable column widths
- Built in windowing to handle large dataset with thousands of rows
- Customizable limiter options
- Customizable toolbar with the ability to add custom renderers
- Completely configurable headers, filters, toolbar and pagination with options to enable/disable them individual
- Custom row level actions
- Thunks to handle custom mass or row actions externally.
- Compatible with normalizr to handle externally managed states
- Easily stylable with styled-components.
- Show or hide columns dynamically using the Columns item in the toolbar.

## Installation

Run the following command to install using npm

```sh
npm i @flipbyte/redux-datatable
```

## Usage

#### Add the table reducer and epics to your store.

```javascript
// Get the table reducer and epics as follows
import { reducer, epics } from '@flipbyte/redux-datatable';

// Add the above reducer and epics to your store.
```

#### Preparing your table config object

```javascript
{
	name: 'your_table_name', // this is the key used to set your table data inside the table reducer
	height: 500,
	rowHeight: 50,
	pagination: {
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
	routes: { // You can add other routes and handle them using custom actions.
		get: { // The route used to fetch data and it's params
			route: '/{your_route}',
			sort: 'id',
			dir: 'asc',
			resultPath: {
				data: 'data'
			}
		},
		...
	},
	toolbar: [ // Each toolbar array of objects below is a separate row in the toolbar section. You can add your own renderers and toolbar items or use some of the in-built ones.
		[{
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
        },
		...
		]
		...
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
        sortable: true,
        width: 150,
        filterable: true,
        sortable: true,
    }, {
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
        },
		...
		]
    },
    ...
    ]
}
```

#### Render table component
```javascript
import ReduxDatatable from '@flipbyte/redux-datatable';

const YourComponent = () =>
	<ReduxDatatable
		reducerName={ /* The key used while combining reducers in the store */ }
		config={ /*your table config object*/ }
	/>
```

### Table config props

| Key | Type | Required | Default | Description |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| name | string | true | - | A unique key where the data for the table is saved in the table state object |
| height | integer | true | - | The maximum height of the table |
| rowHeight | integer | true | - | The maximum height of each table body row |
| filterable | boolean | false | true | Whether to show/hide filters row |
| headers | boolean | false | true | Whether to show/hide headers row |
| pagination | object | false | {} | Pagination bar configuration (Check below) |
| routes | object | true | - | Routes definition to fetch data and other custom routes config for custom handling (Check below)  |
| toolbar | array | false | [] | Toolbar definition (Check below)  |
| columns | array | true | - | Columns to display |

#### Pagination object

| Key | Type | Required | Default | Description |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| items | array | false | [] | Array of item objects available for display in the pagination bar. Check below for items available |
| visible | boolean/object | false | true | Whether the pagination is visible or not |

##### Pagination items array:

| Key | Type | Required | Default | Description |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| type | string | true | - | One of the following: limiter, pages, resultCount |
| visible | boolean | false | true | Whether the item is visible |
| style | object | false | {} | Stylable properties |
| **Limiter specific options** |   |   |   |   |
| options | array | true | - | Array of integers with limiter options |
| default | array | true | - | One of the values in the limiter options key |
| **- style** |   |   |   |   |
| right | boolean | false | false | Align the item to the right |
| width | integer | false | 200 | Width of the item |
| textAlign | string | false | left | Align the text of the item to the right, left or center|
| fontSize | string | false | 14 | The font size of the text in the item |

#### Routes object

| Key | Type | Required | Default | Description |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| get | object | true | - | The configuration for fetching data |
| **- get** |   |   |   |   |
| route | string | true | - | Your data fetching route |
| sort | string | true | - | Your key to sort with |
| dir | string | true | - | Sort by 'asc' or 'desc' order |
| resultPath | object | true | - | The keys object to your data. Required { data: '{your data path in json response. Ex: result.data}'} |

#### Toolbar

Toolbar config is an array of array of object where objects are the toolbar items. Each inner array represents a different row.

| Key | Type | Required | Default | Description |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| type | string | false | actions | Available values reset-filters and columns  |
| label | string | true | - | Label for the toolbar item |
| visible | boolean | false | true | Whether the item is visible |
| state | boolean | false | false | Whether to pass the state object as item prop |
| style | object | false | {} | Define toolbar item styles |
| **For type: actions** |   |   |   |   |
| options | array | true | - | Array of option objects |
| **-- options** |   |   |   |   |
| type | string | true | action | Available option: action |
| name | string | true | - | Unique name for the action |
| label | string | true | - | Label for the action |
| thunk | function | true | - | An action creator which is dispatched on action click. Check demo schema. |
| **- styles** |   |   |   |   |
| right | boolean | false | false | Align the item to the right |
| width | integer | false | 200 | Width of the item |
| fontSize | string | false | 14 | The font size of the text in the item |

#### Columns object

| Key | Type | Required | Default | Description |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| name | string | true | - | Unique name for the column |
| label | string | true | - | Label for the column |
| sortable | boolean | false | true | Whether the column is sortable |
| filterable | boolean | false | true | Whether the column is filterable |
| type | string | true | string | Available types: selection, number, date, string, image, actions |
| width | integer | true | - | Width of the column |
| extraData | string/array | fasle | - | properties from the state to pass as in the extra object |
| textAlign | string | false | left | Text alignment in the column |
| **type: actions** |  |  |  |  |
| items | array | true | - | array of item configuration object |
| **- item configuration object ** |  |  |  |  |
| name  | string | true | - | Unique name for the action |
| label | string | true | - | Label for the action |
| thunk | function | true | - | An action creator which is dispatched on action click. Check demo schema. |

## License
The MIT License (MIT)

[npm-badge]: https://img.shields.io/npm/v/@flipbyte/redux-datatable.svg
[npm]: https://www.npmjs.com/package/@flipbyte/redux-datatable
