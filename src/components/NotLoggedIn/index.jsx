import React from "react";
import { Image, Button } from "antd-mobile";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../constants";

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
      <div className="flex flex-col items-center px-6">
        <Image className="mt-6" src={`${BACKEND_URL}/images/not-logged-in.svg`} />

        <p className="mt-8 text-center text-xl font-bold">
          Access to personal center
          <br />
          to enjoy more features
        </p>
      </div>

      <div className="fixed bottom-buttons w-full">
        <div className="p-5">
          <Button className="font-bold login" onClick={toLogin} block>
            Login
          </Button>
        </div>
        <div className="p-5 bg-color">
          <Button className="font-bold sign-up" onClick={toRegister} block>
            Sign up
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotLoggedIn;
