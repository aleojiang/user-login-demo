# user-login-demo

技术栈：react+dva+antD

根据项目需要，初步学习了下react框架。上述demo是利用dva框架和antD的UI组件库

dva是一个基于 react 和 redux 的轻量应用框架，它最大的特性就是把一个路由下的state、reducer、sagas 写到一块了，每个路由下都有一个model，这个model掌管这个路由的所有状态（action、state、reducer、sagas），组件想改变状态dispatch type名字就行了。具体可以学习[dva](https://github.com/dvajs/dva/blob/master/README_zh-CN.md)和[dva值得一试](https://segmentfault.com/a/1190000011523348)，可参考[dva学习指南](https://www.jianshu.com/p/16b8c6abcc0f)

antD的学习可以具体参考[官网](https://ant.design/index-cn)

下面具体介绍下新建一个页面的具体操作

1. 在src/pages/中以模块名（小写）建立一个文件夹，中间包括了component、models、services文件夹和.js文件

![image](https://user-images.githubusercontent.com/26807227/42788910-e7bc699e-8994-11e8-90ab-63e567cc7143.png)
  
2. 在models中新建一个模型如data.js，models是存放数据和处理逻辑的地方，可以看成是前端中的数据层。dva将model以namespace作为唯一标识进行区分，然后将所有model的数据存储到redux中的store里面。在引用的时候，通过各个model的namespace进行引用。Model，是一个处理数据的地方，在model里面调用service层获取数据

```js
import * as usersService from '../services/data';

export default {
  namespace: 'data', //注册model及命名空间
  state: {
    abc: [],
  },
  reducers: {},
  effects: {
    *fetch({ payload: { } }, { call}) { //调用yield call来执行一个请求
      const { data } = yield call(usersService.fetch);
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
```
3. 在router.js文件中配置整个应用的路由

```js
let routes = [
  {
    "routes": [
      {
        "path": "/data",
        "exact": true,
        "component": require('../data/data.js').default
      },
      {
        "path": "/login",
        "exact": true,
        "component": require('../login/login.js').default
      },
      {
        "path": "/users",
        "exact": true,
        "component": require('../users/page.js').default
      }
    ]
  }
];
```

4. 在component中新建一个组件如Data.js，里面存放最基本的UI组件，这些组件接收外部传过来的参数（数据），并将这些数据渲染的到界面

```js
import { Component } from 'react';
import { connect } from 'dva';
import styles from './data.css';

function Data(){

  function handleClick(e) {
      console.log('click ', e);
  }

  return (
    <div>
      <div className={styles.title}>
        <div className={styles.info}>
          <div>hello world!</div>
          <div>欢迎，张三</div>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) { // 组件中传递数据, 使用mapStateToProps(state)函数, 这里的data是一个命名空间
  const { abc } = state.data;
  return {
    abc,
  }
}

//使用类继承方式, 并且再此与model绑定
export default connect(mapStateToProps)(Data); // 通过connect()()，与导航栏拼和，导出交给路由页 
  ```
  
5. 新建一个data.js，实例化组件

```js
import Data from './components/Data';

export default () => {
  return (
    <div>
      <Data />
    </div>
  )
}
```

6. 在services中新建一个服务，负责向后台请求数据，在services里调用后台提供的api获取数据

```js
import request from '../../../utils/request';

export function fetch() { 
  return request('/api/users'); //两个参数，一个是后台提供的restful API地址，一个是参数
}

```

7. 在utils文件夹中存放一些工具类，比如常见的后台接口请求工具类

```js
import fetch from 'dva/fetch';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
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
  const response = await fetch(url, options);

  checkStatus(response);

  const data = await response.json();
  console.log(666,data)
  const ret = { // 将服务器返回的头部信息和返回的data重新包装
    data,
    headers: {},
  };

  if (response.headers.get('x-total-count')) {
    ret.headers['x-total-count'] = response.headers.get('x-total-count'); // 服务器头信息
  }

  return ret;
}
```

在.webpackrc.js中做反向代理

```js
export default { 
  "publicPath": "/static/",
  "proxy": { 
    "/api": {
      "target": "http://jsonplaceholder.typicode.com/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
}
```

运行上述结果页面，我们可以在console中查看到数据的读取结果

![image](https://user-images.githubusercontent.com/26807227/42854536-df1dc17c-8a6e-11e8-9a8a-95dfdeb5f8d0.png)

