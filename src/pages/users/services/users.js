import { PAGE_SIZE } from '../constants';
import request from '../../../utils/request';

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
};

// 5.yield call方法里面的usersService.fetch方法如下
export function fetch({ page = 1 }) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
  // return request('/api/user/userList', {
  //   method: 'POST',
  //   headers: {
  //     //'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  //           'Content-Type': 'application/json',
  //   },
  //   body: {
  //     _page: { page },
  //     _limit: { PAGE_SIZE },
  //   },
  // });
}

export function remove(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE',
  });
}

export function patch(id, values) {
  return request(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function create(values) {
  values.access_token = localStorage.access_token;
  return request('/api/users', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(values),
  });
}
