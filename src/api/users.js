import request from '@/utils/request'
export function login(data) {
    return request({
        url: '/api/User/Login',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/api/User/GetUsers',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/api/User/LoginOut',
        method: 'post'
    })
}
