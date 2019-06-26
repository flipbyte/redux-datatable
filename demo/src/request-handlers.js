import qs from 'qs';
import _ from 'lodash';
import axiosLib from 'axios';
import { Axios } from 'axios-observable';

const pathToRegexp = require('path-to-regexp');

const create = ( config = {} ) => {
    let defaults = {
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        },
        paramsSerializer: (params) => qs.stringify(params)
    };

    let instance = Axios.create(_.merge(defaults, config));
    instance.axiosInstance.interceptors.request.use(config => {
        const toPath = pathToRegexp.compile(config.url);
        const urlParams = config.params || config.data || {};
        config.url = toPath(urlParams);

        return config;
    }, error => Promise.reject(error));

    instance.axiosInstance.interceptors.response.use(
        response => response.data,
        error => Promise.reject(error)
    );

    return instance;
};

export const api = create({ baseURL: 'https://reqres.in/api' });
export const request = create();

export default create;
