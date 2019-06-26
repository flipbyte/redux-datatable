module.exports = {
    type: 'react-component',
    npm: {
        esModules: true,
        umd: {
            global: 'ReduxDatatable',
            externals: {
                react: 'React',
                lodash: '_',
                'redux-observable': 'ReduxObservable',
                'redux-thunk': 'ReduxThunk'
            }
        }
    }
};
