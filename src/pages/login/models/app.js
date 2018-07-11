
import { routerRedux } from 'dva/router'

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

export default {
  namespace: 'app',
  state:
  {
    loginLoading:false
  },
  subscriptions: {
    setup ({ dispatch }) {
    },
  },
  effects: {
    *login ({payload}, { call, put }) {
      console.log('payload',payload)
      yield put({ type: 'showLoginLoading' })
      yield call(delay,2000)
      yield put({ type: 'hideLoginLoading' })
      yield call(delay,1000)
      yield put(routerRedux.push('/users'))
    }},
  reducers: {
    showLoginLoading (state) {
      return {
        loginLoading: true,
      }
    },
    hideLoginLoading (state) {
      return {
        loginLoading: false,
      }
    },
  },
}