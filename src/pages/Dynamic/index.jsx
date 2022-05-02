import React, { useState, useRef } from "react";
import { Tabs, Swiper } from "antd-mobile";
import Manual from "../../components/Manual";
import Automatic from "../../components/Automatic";
import "./index.css";

const tabItems = [
  { key: "Manual", title: "Manual" },
  { key: "Automatic", title: "Automatic" },
];

const Dynamic = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  return (
    <>
      <Tabs className="tabs">
        {/* {tabItems.map((item) => (
          <Tabs.Tab title={item.title} key={item.key} />
        ))} */}
        <Tabs.Tab destroyOnClose title={tabItems[0].title} key={tabItems[0].key}>
          <Manual />
        </Tabs.Tab>
        <Tabs.Tab destroyOnClose title={tabItems[1].title} key={tabItems[1].key}>
          <Automatic />
        </Tabs.Tab>
      </Tabs>

      {/* <Swiper
        className="flex-1 pt-20"
        direction="horizontal"
        loop
        indicator={() => null}
        ref={swiperRef}
        defaultIndex={activeIndex}
        onIndexChange={(index) => {
          setActiveIndex(index);
        }}
      >
        <Swiper.Item>
          <Manual />
        </Swiper.Item>
        <Swiper.Item>
          <Automatic />
        </Swiper.Item>
      </Swiper> */}
    </>
  );
};

export default Dynamic;
