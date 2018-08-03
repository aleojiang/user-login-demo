// 6.request.js
import fetch from 'dva/fetch';
import $ from 'jquery';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    // console.log(response.headers.get('x-total-count'));
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {

  // 用jaxa发请求
  // const data = await $.ajax(url, options);
  // console.log(666,data)
  // const ret = {
  //   data
  // };

  const response = await fetch(url, options);

  checkStatus(response);

  const data = await response.json();
  console.log('data',data)
  const ret = { // 将服务器返回的头部信息和返回的data重新包装
    data,
    headers: {},
  };

  if (response.headers.get('x-total-count')) {
    ret.headers['x-total-count'] = response.headers.get('x-total-count'); // 服务器头信息
  }

  return ret;
}
