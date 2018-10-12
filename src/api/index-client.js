import axios from 'axios'
import qs from 'qs'
import config from './config-client'
import { showMsg } from '~utils'

axios.interceptors.request.use(
    (config) => {
        // config.headers['X-Requested-With'] = 'XMLHttpRequest';
        let regex = /.*csrftoken=([^;.]*).*$/; // 用于从cookie中匹配 csrftoken值
        config.headers['X-CSRFToken'] = document.cookie.match(regex) === null ? null : document.cookie.match(regex)[1];
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))

function checkStatus(response) {
    if (response.status === 200 || response.status === 304 || response.status === 302) {
        return response
    }
    return {
        data: {
            status: -404,
            detail: response.statusText,
            data: ''
        }
    }
}

function checkCode(res) {
    if (res.data.status === -500) {
        window.location.href = '/backend'
    } else if (res.data.status === -400) {
        window.location.href = '/'
    } else if (res.data.status !== 0) {
        showMsg(res.data.detail)
    }

    return res && res.data
}

export default {
    delete(url, data) {
        return axios({
            method: 'delete',
            url: config.api + url,
            data: qs.stringify(data),
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json; charset=UTF-8',
                'timeline': parseInt(new Date().getTime()/1000).toString()
            }
        })
            .then(checkStatus)
            .then(checkCode)
    },
    post(url, data) {
        return axios({
            method: 'post',
            url: config.api + url,
            // data: qs.stringify(data),
            data: data,
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json; charset=UTF-8',
                'timeline': parseInt(new Date().getTime()/1000).toString()
            }
        })
            .then(checkStatus)
            .then(checkCode)
    },
    put(url, data) {
        return axios({
            method: 'put',
            url: config.api + url,
            data: qs.stringify(data),
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json; charset=UTF-8',
                'timeline': parseInt(new Date().getTime()/1000).toString()
            }
        })
            .then(checkStatus)
            .then(checkCode)
    },
    get(url, params) {
        return axios({
            method: 'get',
            url: config.api + url,
            params,
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'timeline': parseInt(new Date().getTime()/1000).toString()
            }
        })
            .then(checkStatus)
            .then(checkCode)
    }
}
