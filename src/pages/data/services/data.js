
import request from '../../../utils/request';

// const headers = {
//   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
// };

export function fetch() { 
  return request('/api/users'); //两个参数，一个是后台提供的restful API地址，一个是参数
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
