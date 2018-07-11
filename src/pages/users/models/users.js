import * as usersService from '../services/users'; // // dva 封装好的请求方式

// 这是一个用户的model 存储到了localStorage中
export default {
  namespace: 'users', //命名空间
  state: { // 初始化state
    list: [],
    total: null,
    page: null,
  },
  reducers: { // 处理数据
    // 以key/value格式定义reducer，用于处理同步操作，唯一可以修改state的地方，由action触发
    // 格式为{state,action} => newState 或 [(state,action)=>newState,enhancer]
    save(state, { payload: { data: list, total, page } }) { // action的type属性对应的就是方法名 {payload}解构action
      return { ...state, list, total, page }; // reducers中尽量只做state的数据返回 而不要在这里写相关的逻辑
    },
  },
  // 用于处理异步操作和业务逻辑，不直接修改state，由action触发，可以触发action，可以与服务器交互，可以获取全局的state的数据等
  // *(action,effects) => void 或 [*(action,effects) = >void,{type}]
  // type类型 ： takeEvery takeLatest trottle watcher
  effects: { // 接收数据
    // 4.最终地址会跳转到一个fetch方法中，该方法会调用yield call来执行一个请求
    *fetch({ payload: { page = 1 } }, { call, put }) { //调用yield call来执行一个请求
      const { data, headers } = yield call(usersService.fetch, { page });
      yield put({ // 派发 action  让reducers 接收  存储  在model 里面 type 属性不需要加 Login/    在组件中如果你dispatch派发action 需要加Login/
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
        },
      });
    },
    *remove({ payload: id }, { call, put, select }) {
      yield call(usersService.remove, id); // 以异步的方式调用函数,支持promise
      const page = yield select(state => state.users.page); // 从state中获取相关的数据
      yield put({ type: 'fetch', payload: { page } }); // 用来发起一条action
    },
    *patch({ payload: { id, values } }, { call, put, select }) {
      yield call(usersService.patch, id, values);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *create({ payload: values }, { call, put, select }) {
      yield call(usersService.create, values);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
  },
  // ({dispatch,history},done) => unlisenFunction
  // 注意：如果要使用app.unmodel() subscription 必须返回unlisten方法，用来取消数据订阅
  subscriptions: { // 监听数据
    // 定义subscription，subscription是订阅，用于订阅一个数据源，然后根据需要dispatch相应，action
    // 在app.start() 时被执行，数据源可以是当前的时间，服务器的websocket连接，keyboard输入，Geolocation变化，history路由变化等
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
