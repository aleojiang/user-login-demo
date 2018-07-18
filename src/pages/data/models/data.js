import * as usersService from '../services/data';

export default {
  namespace: 'data',
  state: {
    abc: [],
    // list: [],
    // total: null,
    // page: null,
  },
  reducers: {
    // save(state, { payload: { data: list, total, page } }) {
    //   return { ...state, list, total, page };
    // },
  },
  effects: {
    *fetch({ payload: { } }, { call}) { //调用yield call来执行一个请求
      const { data } = yield call(usersService.fetch);
      console.log(111,data)
    //   yield put({
    //     type: 'save',
    //     payload: {
    //       data,
    //       total: parseInt(headers['x-total-count'], 10),
    //       page: parseInt(page, 10),
    //     },
    //   });
    },
  },
  subscriptions: { // 监听，当进入这一页的时候
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/data') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};