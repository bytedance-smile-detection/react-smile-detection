import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Dialog, ImageViewer, Empty } from "antd-mobile";
import SvgIcon from "../SvgIcon";
import Http from "../../services";
import "./index.css";

const LoggedIn = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const [visible, setVisible] = useState(false);
  const [curPic, setCurPic] = useState("");
  const [isShowAll, setIsShowAll] = useState(false);
  const [buttonText, setButtonText] = useState("All");
  const [albumHeight, setAlbumHeight] = useState("");
  // test images
  const picList = [
    { url: "https://images.unsplash.com/photo-1620476214170-1d8080f65cdb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80" },
    { url: "https://images.unsplash.com/photo-1601128533718-374ffcca299b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3128&q=80" },
    { url: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3113&q=80" },
    { url: "https://images.unsplash.com/photo-1624993590528-4ee743c9896e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3113&q=80" },
  ];

  useEffect(() => {
    setName(localStorage.getItem("name"));
    // getImages();
  }, []);

  useEffect(() => {
    if (picList.length === 0) {
      setAlbumHeight("100%");
    } else {
      setAlbumHeight("12rem");
    }
  }, [picList.length]);

  // const getImages = async () => {
  //   const token = localStorage.getItem("token");

  //   try {
  //     const res = await Http.getRequest("/users/getImages", {}, token);
  //     console.log("请求图片成功", res.data);
  //     setPicList(res.data.images);
  //   } catch (error) {
  //     console.log("请求图片出错", error.message);
  //   }
  // };

  const changeDisplayState = () => {
    if (picList.length === 0) {
      setIsShowAll(!isShowAll);
      return;
    }

    if (isShowAll) {
      setIsShowAll(false);
      setAlbumHeight("12rem");
    } else {
      setIsShowAll(true);
      setAlbumHeight("100%");
    }
  };

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
          <Image className="rounded-full" src="https://joeschmoe.io/api/v1/random" width={100} height={100} />
        </span>
        <h1 className="mt-4 text-2xl font-bold font-main-color">{name}</h1>
      </div>

      <div className="mt-6 text-lg font-bold font-main-color flex justify-between">
        <h2 className="pr-4 py-2">Photo Album &nbsp; {picList.length}</h2>
        <span className="pl-4 py-2" onClick={changeDisplayState}>
          {isShowAll ? "Hide" : "All"}
        </span>
      </div>
      <div className="bg-gray-100 p-4 rounded-3xl overflow-auto" style={{ height: `${albumHeight}` }}>
        {picList.length === 0 ? (
          <div className="flex justify-center">
            <Empty description="No photos yet" />
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-4 justify-items-center">
            {picList.map((curPic) => (
              <li className="w-full" key={curPic._id}>
                <Image
                  className="rounded-3xl"
                  src={curPic.url}
                  width="100%"
                  height="10rem"
                  fit="cover"
                  lazy
                  onClick={(event) => {
                    setVisible(true);
                    setCurPic(event.target.currentSrc);
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <ImageViewer
        image={curPic}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      />

      <ul className="setting mt-6 mb-custom rounded-3xl">
        <li className="px-4 py-3">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold font-normal-color">About us</span>
            <SvgIcon name="arrow-right" width={18} height={18} />
          </div>
        </li>
        <li className="px-4 py-3" onClick={handleSignOut}>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold font-normal-color">Sign out</span>
            <SvgIcon name="arrow-right" width={18} height={18} />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default LoggedIn;
