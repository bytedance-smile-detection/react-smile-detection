import React from "react";
import SvgIcon from "../../components/SvgIcon";
import { Form, Button, Input, Toast } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import Http from "../../services";
import "./index.css";

const Login = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/user");
    console.log("goBack");
  };

  const submitToLogin = async (params) => {
    const { name, password } = params;

    if (!name || !password) {
      Toast.show({ content: "Please fill all fields" });
      return;
    }

    try {
      const res = await Http.postRequest("/auths/login", {
        name,
        password,
      });
      console.log(res);

      Toast.show({ content: res.message });
      if (res.code === 200) {
        localStorage.setItem("name", name);
        localStorage.setItem("token", res.data);
        navigate("/user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-6 pt-4">
      <div onClick={goBack}>
        <SvgIcon name="arrow-left" width={32} height={32} />
      </div>

      <h1 className="title text-3xl text-right font-bold py-4">
        Welcome
        <br />
        Sign in to continue
      </h1>

      <Form className="form mt-3" onFinish={submitToLogin}>
        <h2 className="label h-7">Name</h2>
        <Form.Item className="form-item rounded-3xl" name="name">
          <Input
            className="form-input"
            placeholder="Enter your name ..."
            clearable
          />
        </Form.Item>
        <h2 className="label h-7 mt-5">Password</h2>
        <Form.Item className="form-item rounded-3xl" name="password">
          <Input
            className="form-input"
            placeholder="Enter your password ..."
            clearable
            type="password"
          />
        </Form.Item>

        <Button className="form-submit font-bold" type="submit" block>
          Get Started
        </Button>
      </Form>

      <p className="agreement fixed pb-3 text-base underline w-full flex justify-center">
        I agree to terms & conditions
      </p>
    </div>
  );
};

export default Login;
