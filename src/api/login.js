import request from '../utils/request'

export function reqLogin(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}
export function reqRegist(data) {
  return request({
    url: '/auth/register',
    method: 'post',
    data
  })
}

export function reqLogout(data) {
  return request({
    url: '/logout',
    method: 'post',
    data
  })
}