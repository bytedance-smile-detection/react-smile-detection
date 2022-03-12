import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Dialog } from "antd-mobile";
import SvgIcon from "../SvgIcon";
import "./index.css";

const LoggedIn = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("name"));
  }, []);

  const handleSignOut = async () => {
    const result = await Dialog.confirm({
      confirmText: <span className="font-bold font-theme-color">Confirm</span>,
      cancelText: <span className="font-theme-color">Cancel</span>,
      content: "Are you sure to sign out?",
      bodyStyle: {
        borderRadius: "1.5rem",
      },
    });

    if (result) {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      navigate("/");
    }
  };

  return (
    <div className="px-6">
      <div className="flex flex-col justify-between items-center mt-5">
        <span className="avatar flex justify-center items-center rounded-full">
          <Image
            className="rounded-full"
            src="https://joeschmoe.io/api/v1/random"
            width={100}
            height={100}
          />
        </span>
        <h1 className="mt-4 text-2xl font-bold font-main-color">{name}</h1>
      </div>

      <ul className="setting mt-6 rounded-3xl">
        <li className="p-4">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold font-normal-color">
              About us
            </span>
            <SvgIcon name="arrow-right" width={18} height={18} />
          </div>
        </li>
        <li className="p-4" onClick={handleSignOut}>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold font-normal-color">
              Sign out
            </span>
            <SvgIcon name="arrow-right" width={18} height={18} />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default LoggedIn;
