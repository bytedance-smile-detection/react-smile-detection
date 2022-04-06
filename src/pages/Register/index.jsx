import React from "react";
import SvgIcon from "../../components/SvgIcon";
import { Form, Button, Input, Toast } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import Http from "../../services";
import "./index.css";

const Register = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/user");
    console.log("goBack");
  };

  const submitToRegister = async (params) => {
    const { name, password, confirmation } = params;

    if (!name || !password || !confirmation) {
      Toast.show({ content: "Please fill all fields" });
      return;
    }
    if (password !== confirmation) {
      Toast.show({ content: "Password and confirmation do not match" });
      return;
    }

    try {
      const res = await Http.postRequest("/auths/register", {
        name,
        password,
      });
      console.log(res);

      Toast.show({ content: res.message });
      if (res.code === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      Toast.show({ content: "Register failed, please try again" });
    }
  };

  return (
    <div className="px-6 pt-4">
      <div onClick={goBack}>
        <SvgIcon name="arrow-left" width={32} height={32} />
      </div>

      <h1 className="title text-3xl text-right font-bold py-4">
        Create
        <br />
        your account
      </h1>

      <Form className="form mt-3" onFinish={submitToRegister}>
        <h2 className="label h-7">Name</h2>
        <Form.Item className="form-item rounded-3xl" name="name">
          <Input className="form-input" placeholder="Enter your name ..." clearable />
        </Form.Item>
        <h2 className="label h-7 mt-5">Password</h2>
        <Form.Item className="form-item rounded-3xl" name="password">
          <Input className="form-input" placeholder="Enter your password ..." clearable type="password" />
        </Form.Item>
        <h2 className="label h-7 mt-5">Confirm</h2>
        <Form.Item className="form-item rounded-3xl" name="confirmation">
          <Input className="form-input" placeholder="Confirm your password ..." clearable type="password" />
        </Form.Item>

        <Button className="form-submit font-bold" type="submit" block>
          Get Started
        </Button>
      </Form>

      <p className="agreement fixed pb-3 text-base underline w-full flex justify-center">I agree to terms & conditions</p>
    </div>
  );
};

export default Register;
