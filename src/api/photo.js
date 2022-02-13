import request from '../utils/request'

export function photoList(data) {
  return request({
    url: '/photo/list',
    method: 'post',
    data
  })
}

export function deleteItem(data) {
  return request({
    url: '/photo/delete',
    method: 'post',
    data
  })
}
export function editItem(data) {
  return request({
    url: '/photo/edit',
    method: 'post',
    data
  })
}