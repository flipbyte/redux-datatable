# @flipbyte/redux-datatable

[Developed by Flipbyte](https://www.flipbyte.com/)

[![npm package][npm-badge]][npm]
[![Codacy Badge][codacy-badge]][codacy]

Datatable built using React and Redux to fetch JSON data asynchronously
using REST API.  

-   Filterable columns by date ranges, numeric ranges and text.
-   Pagination
-   Sortable columns
-   Configurable column widths
-   Editable table
-   Built in windowing to handle large dataset with thousands of rows
-   Customizable limiter options
-   Customizable toolbar with the ability to add custom renderers
-   Easily configurable layout
-   Custom row level actions
-   Thunks to handle custom mass or row actions externally.
-   Compatible with normalizr to handle externally managed states
-   Easily styleable with styled-components and/or external css.
-   Show or hide columns dynamically using the Columns item in the
    toolbar.

## Installation

Run the following command to install using npm

```sh
npm i @flipbyte/redux-datatable
```

## Usage

### Add the table reducer and epics to your store

```javascript
// Get the table reducer and epics as follows
import { reducer, epics } from '@flipbyte/redux-datatable';

// Add the above reducer and epics to your store.
```

### Preparing your table config object

```javascript
{
    name: 'your_table_name', // this is the key used to set your table data inside the table reducer
    height: 400,
    rowHeight: 50,
    editing: false,
    primaryKey: 'id',
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
    entity: { // optional. Check example code in /demo.
        state: '{your state path}',
        responseSchema: // normalizr schema,
        schema: // normal;izr schema
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
        Loader: {
            styles: {
                mask: { ... },
                spinner: { ... }
            }
        },
        ResultCount: {
            styles: { ... }
        },
        Pages: {
            styles: {
                first: { ... },
                last: { ... },
                previous: { ... },
                next: { ... },
                pageNumber: { ... },
            }
        },
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
            styles: {
                show: { ... },
                hide: { ... },
                save: { ... }
            }
            // renderer: ( props ) => { ... }
        },
        MassActions: {
            name: 'actions',
            label: 'Actions',
            id: 'dropdown',
            styles: {
                button: { ... },
                dropdownMenu: { ... },
                dropdownItem: { ... }
            }
            options: [{
                type: 'action',
                name: 'delete',
                label: 'Delete',
                styles: { ... },
                thunk: ( config ) => ( dispatch, getState ) => {
                    // Get current table state.
                    const tableState = getState()[config.reducerName][config.name];
                    console.log(config, tableState);
                    console.log(getItemIds(tableState.selection, tableState.items, config.primaryKey/*, config.entity.schema*/))
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
            }, ...]
        },
        SimpleButton: {
            type: 'button',
            label: 'Simple Button',
            thunk: ( config ) => ( dispatch, getState ) => { ... },
            styles: { ... }
        },
        ResetFilters: {
            type: 'reset-filters',
            label: 'Reset Filters',
            styles: { ... }
        },
        Print: {
            type: 'print',
            label: 'Print Table',
            styles: { ... }
        },
        Columns: {
            name: 'columns',
            type: 'columns',
            label: 'Columns',
            visible: true,
            styles: {
                button: { ... },
                dropdownMenu: { ... },
                dropdownItem: { ... }
            }
        },
        Limiter: {
            type: 'limiter',
            options: [10, 20, 50, 200, 2000, 0],
            default: 200,
            styles: { ... }
        },
        Table: {
            styles: {
                table: { ... },
                thead: { ... },
                tbody: { ... },
                filters: { ... },
                tr: {
                    header: { ... },
                    filters: { ... },
                    body: { ... }
                },
                th: { ... },
                td: {
                    filters: { ... },
                    body: { ... }
                }
            },
            columns: [{
                name: 'id',
                label: '',
                sortable: false,
                type: 'selection',
                width: 50,
            }, {
                label: 'ID',
                type: 'number',
                name: 'id',
                sortable: true,
                width: 150,
                filterable: true,
                sortable: true,
            }, {
                label: "Status",
                type: "options",
                name: "status",
                sortable: true,
                filterable: true,
                textAlign: "center",
                options: {
                    "published": {
                        label: "Published"
                    },
                    "draft": {
                        label: "Draft"
                    },
                    "archived": {
                        label: "Archived"
                    },
                    ...
                }
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
                    thunk: ( payload ) => ( dispatch, getState ) => {
                        console.log('edit', payload, getState());
                    },
                    style: { ... }
                }, {
                    type: 'action',
                    name: 'delete',
                    label: 'Delete',
                    icon: 'trash-alt',
                    thunk: ( payload ) => ( dispatch, getState ) => {
                        confirm("Are your sure you want to delete this page?")
                            ? console.log('delete', getState())
                            : console.log(false);
                    },
                    style: { ... }
                },
            	...
            	]
            },
            ...
            ]
        }
    }
}
```

### Render table component

```javascript
import ReduxDatatable from '@flipbyte/redux-datatable';

const YourComponent = () =>
	<ReduxDatatable
		reducerName={ /* The key used while combining reducers in the store */ }
		config={ /*your table config object*/ }
	/>
```

### Table config props

| Key        | Type    | Required | Default | Description                                                                                      |
| ---------- | ------- | -------- | ------- | ------------------------------------------------------------------------------------------------ |
| name       | string  | true     | -       | key in the row data whose value needs to be loaded for the column (does not have to be unique)   |
| height     | integer | true     | -       | The maximum height of the table                                                                  |
| rowHeight  | integer | true     | -       | The maximum height of each table body row                                                        |
| routes     | object  | true     | -       | Routes definition to fetch data and other custom routes config for custom handling (Check below) |
| components | object  | true     | -       | All the components required for your table                                                       |
| entity     | object  | false    | -       | [Normalizr](https://github.com/paularmstrong/normalizr) specification. Check below for details.  |
| layout     | array   | true     | -       | The layout of your table                                                                         |
| editing    | boolean | false    | false   | Set the default state of the table to be in editing mode                                         |
| primaryKey | string  | true     | -       | Set the primary key column of the table for actions like editing.                                |

#### Routes object

| Key        | Type   | Required | Default | Description                                                                                          |
| ---------- | ------ | -------- | ------- | ---------------------------------------------------------------------------------------------------- |
| get        | object | true     | -       | The configuration for fetching data                                                                  |
| **- get**  |        |          |         |                                                                                                      |
| route      | string | true     | -       | Your data fetching route                                                                             |
| sort       | string | true     | -       | Your key to sort with                                                                                |
| dir        | string | true     | -       | Sort by 'asc' or 'desc' order                                                                        |
| resultPath | object | true     | -       | The keys object to your data. Required { data: '{your data path in json response. Ex: result.data}'} |

#### Components object

Components can be defined within this object as key value pairs, where `key` is the id of the component and needs to be unique and `value` is a configuration object for the specific component.
All available components are listed below with their configuration. Custom components can be added and existing components can be overridden by using the key `renderer` in the configuration object of the component.
Please check the example table config object above.

#### Layout array

An array of arrays where each inner array represents a row in the layout, within which components can be specified, which will be displayed in the frontend.
Please check the example table config object above.

#### Entity array

All the fields are required when entity is defined. However, entity key itself is optional in the table config.

| Key            | Type   | Required | Default | Description                                                                             |
| -------------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------- |
| state          | object | true     | -       | Path to sub state in your top level redux state where the normalized data will be saved |
| responseSchema | object | true     | -       | Define how the data is represented in your fetch data api response                      |
| schema         | object | true     | -       | Define how the data is represented in each row item of the table fetch repsonse         |
| selectors      | object | true     | -       | Add the selectors that will be used by columns to fetch respective data                 |

Note: Check the [example](https://github.com/flipbyte/redux-datatable/blob/master/demo/src/schema/normalized.js) code.

#### Available Components

**_Common Properties_**

| Key      | Type     | Required | Default | Description                                                                                        |
| -------- | -------- | -------- | ------- | -------------------------------------------------------------------------------------------------- |
| styles   | object   | false    | {}      | styled-component styles object or key-value pairs with values being styled-component styles object |
| renderer | function | false    | -       | returns a react component                                                                          |
| type     | string   | true     | -       | the type of the object                                                                             |

##### Loader

Note: This component cannot be added to the layout and does not have any other properties except styles.

**_Styles object properties_**

| Key     | Type   | Required | Default | Description                    |
| ------- | ------ | -------- | ------- | ------------------------------ |
| mask    | object | false    | {}      | styled-component styles object |
| spinner | object | false    | {}      | styled-component styles object |

##### ResultCount

No unique properties

##### Pages

**_Styles object properties_**

| Key        | Type   | Required | Default | Description                    |
| ---------- | ------ | -------- | ------- | ------------------------------ |
| first      | object | false    | {}      | styled-component styles object |
| last       | object | false    | {}      | styled-component styles object |
| previous   | object | false    | {}      | styled-component styles object |
| next       | object | false    | {}      | styled-component styles object |
| pageNumber | object | false    | {}      | styled-component styles object |

##### Editable (type: editable)

Toggles the table between editable and non-editable and shows a save button when the content of the table is modified

**_Properties_**

| Key    | Type     | Required | Default     | Description                                     |
| ------ | -------- | -------- | ----------- | ----------------------------------------------- |
| labels | object   | false    | check below | check below                                     |
| save   | function | false    | -           | ( config ) => ( dispatch, getState ) => { ... } |

**_Labels object properties_**

| Key  | Type   | Required | Default       | Description                                     |
| ---- | ------ | -------- | ------------- | ----------------------------------------------- |
| show | string | false    | Make editable | Label for the button to show editable table     |
| hide | string | false    | Hide editable | Label for the button to hide editable table     |
| save | string | false    | Save          | Label for the button to save the modified table |

**_Styles object properties_**

| Key  | Type   | Required | Default | Description                    |
| ---- | ------ | -------- | ------- | ------------------------------ |
| show | object | false    | {}      | styled-component styles object |
| hide | object | false    | {}      | styled-component styles object |
| save | object | false    | {}      | styled-component styles object |

##### Actions (type: mass-actions)

**_Properties_**

| Key     | Type   | Required | Default | Description                           |
| ------- | ------ | -------- | ------- | ------------------------------------- |
| options | array  | required | \[]     | array of actions objects              |
| label   | string | required | -       | Label for the actions dropdown button |

**_Actions object properties_**

| Key   | Type     | Required | Default | Description                                     |
| ----- | -------- | -------- | ------- | ----------------------------------------------- |
| type  | string   | true     | -       | action                                          |
| name  | string   | true     | -       | Unique name                                     |
| label | string   | true     | -       | Label for the action item                       |
| thunk | function | true     | -       | ( config ) => ( dispatch, getState ) => { ... } |

**_Styles object properties_**

| Key          | Type   | Required | Default | Description                    |
| ------------ | ------ | -------- | ------- | ------------------------------ |
| button       | object | false    | {}      | styled-component styles object |
| dropdownMenu | object | false    | {}      | styled-component styles object |
| dropdownItem | object | false    | {}      | styled-component styles object |

##### Button (type: button)

**_Properties_**

| Key   | Type   | Required | Default | Description                           |
| ----- | ------ | -------- | ------- | ------------------------------------- |
| label | string | required | -       | Label for the actions dropdown button |

##### ResetFilters (type: reset-filters)

**_Properties_**

| Key   | Type   | Required | Default | Description                           |
| ----- | ------ | -------- | ------- | ------------------------------------- |
| label | string | required | -       | Label for the actions dropdown button |

##### Print (type: print)

Makes the table printable.

**_Properties_**

| Key   | Type   | Required | Default | Description                           |
| ----- | ------ | -------- | ------- | ------------------------------------- |
| label | string | required | -       | Label for the actions dropdown button |

##### Columns (type: columns)

Shows the columns toggling dropdown.

**_Properties_**

| Key   | Type   | Required | Default | Description                           |
| ----- | ------ | -------- | ------- | ------------------------------------- |
| label | string | required | -       | Label for the actions dropdown button |

**_Styles object properties_**

| Key          | Type   | Required | Default | Description                    |
| ------------ | ------ | -------- | ------- | ------------------------------ |
| button       | object | false    | {}      | styled-component styles object |
| dropdownMenu | object | false    | {}      | styled-component styles object |
| dropdownItem | object | false    | {}      | styled-component styles object |

##### Limiter (type: limiter)

| Key     | Type    | Required | Default | Description                                                           |
| ------- | ------- | -------- | ------- | --------------------------------------------------------------------- |
| options | array   | required | \[]     | array of limiter counts                                               |
| default | integer | required | \[]     | default limiter option (should be a value in the options array above) |

##### Table (type: table)

| Key     | Type  | Required | Default | Description                               |
| ------- | ----- | -------- | ------- | ----------------------------------------- |
| columns | array | required | \[]     | array of object with column configuration |

**_Columns object properties_**

| Key                             | Type     | Required | Default | Description                                                                                   |                                                                                                                                                      |
| ------------------------------- | -------- | -------- | ------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| name                            | string   | true     | -       | Unique name for the column                                                                    |                                                                                                                                                      |
| label                           | string   | true     | -       | Label for the column                                                                          |                                                                                                                                                      |
| sortable                        | boolean  | false    | true    | Whether the column is sortable                                                                |                                                                                                                                                      |
| filterable                      | boolean  | false    | true    | Whether the column is filterable                                                              |                                                                                                                                                      |
| editable                        | boolean  | false    | false   | When the table is set to be editable, set whether the respective column is among the editable |                                                                                                                                                      |
| visible                         | boolean  | false    | true    | Whether the column is visible on load                                                         |                                                                                                                                                      |
| type                            | string   | true     | string  | Available types: selection, number, date, string, image, options, actions                     |                                                                                                                                                      |
| width                           | integer  | true     | -       | Width of the column                                                                           |                                                                                                                                                      |
| textAlign                       | string   | false    | left    | Text alignment in the column                                                                  |                                                                                                                                                      |
| renderer                        | function | false    | -       | Define a custom renderer for column body.                                                     |                                                                                                                                                      |
| selector                        | string   | object   | false   | -                                                                                             | Define a custom selector to pick the value for the column from the state. When string is used, the selector should be defined under entity.selectors |
| **type: actions**               |          |          |         |                                                                                               |                                                                                                                                                      |
| items                           | array    | true     | -       | array of item configuration object                                                            |                                                                                                                                                      |
| **- item configuration object** |          |          |         |                                                                                               |                                                                                                                                                      |
| name                            | string   | true     | -       | Unique name for the action                                                                    |                                                                                                                                                      |
| label                           | string   | true     | -       | Label for the action                                                                          |                                                                                                                                                      |
| thunk                           | function | true     | -       | An action creator which is dispatched on action click. Check demo schema.                     |                                                                                                                                                      |

**_Properties specific to column of type 'options'_**

| Key     | Type   | Required | Default | Description                                  |
| ------- | ------ | -------- | ------- | -------------------------------------------- |
| options | object | true     | -       | Defines options for the column. Check below. |

`options` key is an object with a unique key for each value object. The value object consists of a property `label` used to define the label of the said option. Please check the following example:

```js
options: {
    active: {
        label: 'Active'
    },
    inactive: {
        label: 'Inactive'
    }
    ...
}
```

**_Properties specific to column of type 'actions'_**

| Key   | Type  | Required | Default | Description                        |
| ----- | ----- | -------- | ------- | ---------------------------------- |
| items | array | true     | -       | array of item configuration object |

**_Properties for a single item of type 'actions'_**

| Key    | Type     | Required | Default | Description                                                                     |
| ------ | -------- | -------- | ------- | ------------------------------------------------------------------------------- |
| name   | string   | true     | -       | Unique name for the action                                                      |
| label  | string   | true     | -       | Label for the action                                                            |
| thunk  | function | true     | -       | An action creator which is dispatched on action click. Check the example below. |
| styles | object   | false    | {}      | styled-component styles object                                                  |

Example:

```js
{
    type: 'action',
    name: 'edit',
    label: 'Edit',
    btnClass: 'btn btn-secondary',
    icon: 'edit',
    thunk: ( payload ) => ( dispatch, getState ) => {
        console.log('edit', payload, getState());
    },
    styles: { ... }
}
```

**_Styles object properties_**

| Key     | Type   | Required | Default | Description                    |
| ------- | ------ | -------- | ------- | ------------------------------ |
| table   | object | false    | {}      | styled-component styles object |
| thead   | object | false    | {}      | styled-component styles object |
| tbody   | object | false    | {}      | styled-component styles object |
| filters | object | false    | {}      | styled-component styles object |
| tr      | object | false    | {}      | check below                    |
| th      | object | false    | {}      | styled-component styles object |
| td      | object | false    | {}      | check below                    |

**_tr Styles object properties_**

| Key     | Type   | Required | Default | Description                    |
| ------- | ------ | -------- | ------- | ------------------------------ |
| header  | object | false    | {}      | styled-component styles object |
| filters | object | false    | {}      | styled-component styles object |
| body    | object | false    | {}      | styled-component styles object |

**_td Styles object properties_**

| Key     | Type   | Required | Default | Description                    |
| ------- | ------ | -------- | ------- | ------------------------------ |
| filters | object | false    | {}      | styled-component styles object |
| body    | object | false    | {}      | styled-component styles object |

## License

The MIT License (MIT)

[npm-badge]: https://img.shields.io/npm/v/@flipbyte/redux-datatable.svg

[npm]: https://www.npmjs.com/package/@flipbyte/redux-datatable

[codacy-badge]: https://api.codacy.com/project/badge/Grade/67274650b4874f5db55ede76156ab4d2

[codacy]: https://www.codacy.com/app/flipbyte/redux-datatable?utm_source=github.com&utm_medium=referral&utm_content=flipbyte/redux-datatable&utm_campaign=Badge_Grade
