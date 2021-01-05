import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/wucms/user/login',
    method: 'post',
    data
  })
}

export function reg(data) {
  return request({
    url: '/wucms/user/reg',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/wucms/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/wucms/user/logout',
    method: 'post'
  })
}
