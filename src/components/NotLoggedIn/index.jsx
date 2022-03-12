import React from "react";
import { Image, Button } from "antd-mobile";
import "./index.css";
import { useNavigate } from "react-router-dom";

const NotLoggedIn = () => {
  const navigate = useNavigate();

  const toLogin = () => {
    navigate("/login");
  };

  const toRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="flex flex-col justify-center px-6">
        <Image
          className="mt-20"
          src="https://www.xiaoqw.online/source/smile-detection-nologin.svg"
        />

        <p className="mt-8 text-center text-2xl font-bold">
          Access to personal center
          <br />
          to enjoy more features
        </p>
      </div>

      <div className="fixed bottom-buttons w-full">
        <div className="p-6">
          <Button className="font-bold login" onClick={toLogin} block>
            Login
          </Button>
        </div>
        <div className="p-6 bg-color">
          <Button className="font-bold sign-up" onClick={toRegister} block>
            Sign up
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotLoggedIn;
