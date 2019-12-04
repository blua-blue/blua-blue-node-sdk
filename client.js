const axios = require('axios');
const Client = {
    token: false,
    axiosInstance: false,
    currentUser: false,
    cache: [],
    findInCache(by, value){
        let test = this.cache.find(item => item[by] === value);
        return typeof test === 'undefined' ? false : test;
    },
    _defaultRequest() {
        this.axiosInstance.interceptors.request.use((config) => {
            if (Client.token) {
                config.headers.Authorization = `Bearer ${Client.token}`;
            }
            return config;
        });
    },
    async _reauthenticate(error, userName, password, bluaUrl){
        const originalRequest = error.config;

        if (error.response.status === 401 && originalRequest.url === bluaUrl + '/login') {
            return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {

            originalRequest._retry = true;
            return Client.authenticate(userName, password).then(res => {
                if (res.status >= 200 && res.status < 300) {
                    Client.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${Client.token}`;
                    return Client.axiosInstance(originalRequest);
                }
            }).catch(e => {
                throw new Error('Failed too many times');
            })
        }
        return Promise.reject(error);
    },
    async authenticate(userName, password) {
        return new Promise((resolve, reject) => {
            this.axiosInstance.post('/login', {
                userName: userName,
                password: password
            }).then(res => {
                Client.token = res.data.token;
                Client.currentUser = res.data.user;
                resolve(res);
            }).catch(e => {
                reject(e);
            });
        })
    },
    async init(userName, password, bluaUri) {
        let baseUri = typeof bluaUri === 'undefined' ? 'https://blua.blue/api.v1' : bluaUri;
        this.axiosInstance = axios.create({
            baseURL: baseUri,
            timeout: 2000,
            headers: {'X-Sdk-Client': 'nodeJS'}
        });
        this._defaultRequest();
        this.axiosInstance.interceptors.response.use((response) => {
            return response
        }, (error) => {
            return Client._reauthenticate(error, userName, password, baseUri);
        });
        if (!Client.token) {
            return this.authenticate(userName, password);
        }

    },
    async getArticle(slugOrId) {
        let isId = null !== slugOrId.match(/^[A-Z0-9]{32}$/);
        let response = this.findInCache(isId ? 'id' : 'slug', slugOrId);
        if(!response){
            response = await this.axiosInstance.get('/article?' + (isId ? 'id=' : 'slug=') + slugOrId);
            response = response.data;
            this.cache.push(response)
        }
        return response;

    },
    async getArticleList(condition) {
        if (typeof condition === 'undefined') {
            condition = {};
        }
        if (typeof condition.author === 'undefined') {
            condition.author = this.currentUser.userName;
        }
        let i = 0, queryString = '';
        Object.keys(condition).forEach((key) => {
            queryString += (i > 0 ? '&' : '?') + `${key}=${condition[key]}`;
            i++;
        });
        let response = await this.axiosInstance.get('/articleList' + queryString);
        this.cache = response.data;
        return response.data;
    }

};

module.exports = Client;