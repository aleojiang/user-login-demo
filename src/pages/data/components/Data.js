import { Component } from 'react';
import { connect } from 'dva';
import { Modal, Form, Input } from 'antd';
import { Menu, Icon } from 'antd';
import styles from './data.css';
// const FormItem = Form.Item;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

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

function mapStateToProps(state) { // 取到state值
    const { abc } = state.data;
    return {
        abc,
    }
    // const { list, total, page } = state.users;
    // return {
    //   list,
    //   total,
    //   page,
    //   loading: state.loading.models.users, //umi-plugin-dva 默认内置了 dva-loading 插件
    // };
  }
  
  export default connect(mapStateToProps)(Data); // 通过connect()() 