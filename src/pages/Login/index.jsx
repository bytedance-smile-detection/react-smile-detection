import React from 'react';
import { Form, Button, Toast ,Input} from "antd-mobile";
import { connect } from 'react-redux';
import { login, getUserInfo } from "../../store/actions";
import { LeftOutline } from 'antd-mobile-icons'
import {useNavigate } from "react-router-dom";
import "./index.css";

const Login = (props) => {
  const {login, getUserInfo } = props;
  const navigate = useNavigate();
  const toAuth = () => {
    navigate("/auth");
  };
  const handleLogin = (param) => {
    console.log(param);
    login(param.username, param.password)
      .then((data) => {
        Toast.show({
          content: "登录成功",
        });
        // handleUserInfo(data.token);
        navigate("/userspace");
      })
      .catch((error) => {
        Toast.show({
          content: error,
        });
      });
  };
  // 获取用户信息
  const handleUserInfo = (token) => {
    getUserInfo(token)
      .then((data) => { })
      .catch((error) => {
        Toast.show({
          content: error,
        });
      });
  };

  return (


    <div className="flex flex-col justify-center items-center">
    <div className='logtopbanner'>
    <LeftOutline className='backbtn' onClick={toAuth}/>
    </div>
      <div className='login-title'>Welcome<br/>login to continue</div>
      <Form
        onFinish={handleLogin}
        footer={
          <Button block type='submit' className='login-button' size='large'>
            Get Started
          </Button>
        }
      >
        <Form.Item
          name='username'
          label='Name'
          rules={[{ required: true, message: '用户名不能为空' }]}
        >
          <Input className='input' placeholder='请输入用户名' clearable />
        </Form.Item>
        <Form.Item
          name='password'
          label='Password'
          rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Input className='input' placeholder='请输入密码' clearable type='password' />
        </Form.Item>
      </Form>
    </div>
  );
}
export default connect((state) => state.user, { login, getUserInfo })(
  Login
);
