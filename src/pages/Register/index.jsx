import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Button, Space, Form, Input, Toast } from 'antd-mobile'

import './index.css'
export default function Register() {
        const [userName, setUserName] = useState('');
        const [passwd, setPasswd] = useState('');
        const navigate = useNavigate()
        return (
                <div className='page'>
                        <Space className='space' block direction='vertical'>
                                <h1 className="text-2xl text-gray-800 font-bold">注册</h1>
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
                                                axios.post("http://112.124.39.72:8000/api/auth/register", {
                                                        "name": userName,
                                                        "password": passwd
                                                }).then(response => {
                                                        Toast.show({
                                                                content: '注册成功',
                                                                position: 'bottom',
                                                                afterClose: () => {
                                                                        navigate('/Login')
                                                                }
                                                        })
                                                }, error => {
                                                        Toast.show({
                                                                content: '用户名已存在',
                                                                position: 'bottom',
                                                        })
                                                })

                                        }}
                                >
                                        注册
                                </Button>

                        </Space>
                </div>
        )
}
