import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import PubSub from 'pubsub-js';
import { Button, Space, Form, Input, Toast } from 'antd-mobile'
import { LOGINSUCCESS } from '../../constants';
import './index.css'

export default function Login() {
        const [userName, setUserName] = useState('');
        const [passwd, setPasswd] = useState('');
        const navigate = useNavigate();

        const ToRegister = () => {
                setTimeout(() => {
                        navigate('/Register');
                }, 300)

        }

        return (
                <div className='page'>
                        <Space className='space' block direction='vertical'>
                                <h1 className="text-2xl text-gray-800 font-bold">登陆</h1>
                                <Form layout='horizontal'>
                                        <Form.Item label='用户名' name='username'>
                                                <Input className='input' placeholder='请输入用户名' clearable onChange={value => setUserName(value)} />
                                        </Form.Item>
                                        <Form.Item label='密码' name='password'>
                                                <Input className='input' placeholder='请输入密码' clearable type='password' onChange={value => setPasswd(value)} />
                                        </Form.Item>
                                </Form>


                                <Button
                                        block color='primary' size='middle'
                                        onClick={() => {
                                                axios.post("http://112.124.39.72:8000/api/auth/login", {
                                                        "name": userName,
                                                        "password": passwd
                                                }).then(response => {
                                                        Toast.show({
                                                                content: '登陆成功',
                                                                position: 'bottom',
                                                                afterClose: () => {
                                                                        PubSub.publish(LOGINSUCCESS, true);
                                                                        navigate('/dynamic')
                                                                }
                                                        })

                                                }, error => {

                                                        Toast.show({
                                                                content: '用户名或密码错误',
                                                                position: 'bottom',
                                                        })
                                                })

                                        }}
                                >
                                        登陆
                                </Button>

                                <Button block color='primary' size='middle' onClick={ToRegister}>
                                        注册
                                </Button>
                        </Space>
                </div>
        )
}
