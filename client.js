const axios = require('axios');
const Client = {
    token: false,
    axiosInstance: false,
    currentUser: false,
    init(userName, password, bluaUri) {
        this.axiosInstance = axios.create({
            baseURL: typeof bluaUri === 'undefined' ? 'https://blua.blue/api.v1' : bluaUri,
            timeout: 2000,
            headers: {'X-Sdk-Client': 'nodeJS'}
        });
        return new Promise((resolve, reject) => {
            this.axiosInstance.post('/login', {
                userName: userName,
                password: password
            }).then(res => {
                Client.axiosInstance.interceptors.request.use(function (config) {
                    config.headers.Authorization = `Bearer ${res.data.token}`;
                    return config;
                });
                Client.token = res.data.token;
                Client.currentUser = res.data.user;
                resolve(true);
            }).catch(err => {
                reject('Authentication failed')
            });
        })
    },
    async getArticle(slugOrId) {
        let isId = null !== slugOrId.match(/^[A-Z0-9]{32}$/);
        let response = await this.axiosInstance.get('/article?' + (isId ? 'id=' : 'slug=') + slugOrId);
        return response.data;
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
        return response.data;
    }
};

module.exports = Client;