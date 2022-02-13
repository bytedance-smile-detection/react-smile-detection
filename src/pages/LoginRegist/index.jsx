import React from 'react';
import { Form, Button, Toast, Input } from "antd-mobile";
import { connect } from 'react-redux';
import { Navigate,useNavigate } from "react-router-dom";
import "./index.css";
import SvgIcon from "../../components/SvgIcon";

const LoginRegist = (props) => {
  const { token } = props;
  const navigate = useNavigate();
  const toLogin = () => {
    navigate("/login");
  };
  const toRegist = () => {
    navigate("/regist");
  };
  if (token) {
    console.log('token null');
    return <Navigate to="/userspace" />;
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className='smilecontent flex flex-col justify-center items-center'>
        <SvgIcon iconClass="smile" />
        <div className='personalcenter-title'>Access to personal center<br />to enjoy more features</div>
        <Button
          className="loginbutton font-semibold"
          onClick={toLogin}
        >
          Login
        </Button>
      </div>
      <div className='signbg fixed flex flex-col items-center'>
        <Button
          className="registbutton font-semibold"
          fill="outline"
          onClick={toRegist}
        >
          Sign up
        </Button>
      </div>

    </div>
  );
}
export default connect((state) => state.user, {})(
  LoginRegist
);