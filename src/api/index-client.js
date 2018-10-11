import axios from 'axios'
import qs from 'qs'
import config from './config-client'
import { showMsg } from '~utils'

axios.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))

function checkStatus(response) {
    if (response.status === 200 || response.status === 304) {
        return response
    }
    return {
        data: {
            code: -404,
            message: response.statusText,
            data: ''
        }
    }
}

function checkCode(res) {
    if (res.data.code === -500) {
        window.location.href = '/backend'
    } else if (res.data.code === -400) {
        window.location.href = '/'
    } else if (res.data.code !== 200) {
        showMsg(res.data.message)
    }
    return res && res.data
}

export default {
    delete(url, data) {
        return axios({
            method: 'delete',
            // url: config.api + url,
            url: url,
            data: qs.stringify(data),
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json; charset=UTF-8',
                'HTTP_TIMELINE': parseInt(new Date().getTime()/1000).toString()
            }
        })
            .then(checkStatus)
            .then(checkCode)
    },
    post(url, data) {
        return axios({
            method: 'post',
            // url: config.api + url,
            url: url,
            data: qs.stringify(data),
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json; charset=UTF-8',
                'HTTP_TIMELINE': parseInt(new Date().getTime()/1000).toString()
            }
        })
            .then(checkStatus)
            .then(checkCode)
    },
    put(url, data) {
        return axios({
            method: 'put',
            // url: config.api + url,
            url: url,
            data: qs.stringify(data),
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json; charset=UTF-8',
                'HTTP_TIMELINE': parseInt(new Date().getTime()/1000).toString()
            }
        })
            .then(checkStatus)
            .then(checkCode)
    },
    get(url, params) {
        return axios({
            method: 'get',
            // url: config.api + url,
            url: url,
            params,
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'HTTP_TIMELINE': parseInt(new Date().getTime()/1000).toString()
            }
        })
            .then(checkStatus)
            .then(checkCode)
    }
}
