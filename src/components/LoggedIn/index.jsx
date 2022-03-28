import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Dialog, ImageViewer } from "antd-mobile";
import SvgIcon from "../SvgIcon";
import "./index.css";
import axios from "axios";

const LoggedIn = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const [visible, setVisible] = useState(false)
  const [curPic, setCurPic] = useState('')
  const [picList, setPicList] = useState([])
  /* 测试集 */
  /* const demoImages = [
    { url: 'https://images.unsplash.com/photo-1620476214170-1d8080f65cdb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80' },
    { url: 'https://images.unsplash.com/photo-1601128533718-374ffcca299b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3128&q=80' },
    { url: 'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3113&q=80' },
    { url: 'https://images.unsplash.com/photo-1624993590528-4ee743c9896e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=1000&q=80' },
  ] */



  useEffect(() => {
    setName(localStorage.getItem("name"));
    let token = localStorage.getItem('token')
    axios({
      url: 'http://112.124.39.72:8000/api/users/getImages',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      console.log('请求图片成功', res.data);
      setPicList(res.data.images);
      // setPicList(demoImages);
    },
      (err) => {
        console.log('请求图片出错', err.message);
      })

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


      <ul className="mt-6  bg-gray-100 p-4 h-60 rounded-3xl  overflow-auto grid grid-cols-2 justify-items-center gap-y-3">

        {
          picList.length === 0 ? (<li className="p-4">
            <span className="text-xl font-bold font-normal-color">
              还没有照片 快去拍照吧！
            </span>
          </li>) : <></>
        }

        {
          picList.map((curPic, i) => {
            return <li key={i}>
              <Image
                src={curPic.url}
                width={"8rem"}
                height={"8rem"}
                fit='cover'
                style={{ borderRadius: 8 }}
                lazy

                onClick={(event) => {
                  setVisible(true);
                  // console.log(event.target.currentSrc); //得到点击图片的src
                  setCurPic(event.target.currentSrc)
                }}
              />
            </li>
          })
        }
      </ul>

      <>
        <ImageViewer
          image={curPic}
          visible={visible}
          onClose={() => {
            setVisible(false)
          }}
        />
      </>




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
