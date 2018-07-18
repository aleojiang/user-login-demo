
import request from '../../../utils/request';

// const headers = {
//   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
// };

export function fetch() { 
  return request('/api/users'); //两个参数，一个是后台提供的restful API地址，一个是参数

}
