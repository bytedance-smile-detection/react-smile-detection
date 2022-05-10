import React from "react";
import { Tabs } from "antd-mobile";
import Manual from "../../components/Manual";
import Automatic from "../../components/Automatic";
import "./index.css";

const tabItems = [
  { key: "Manual", title: "Manual" },
  { key: "Automatic", title: "Automatic" },
];

const Dynamic = () => {
  return (
    <>
      <Tabs className="tabs">
        <Tabs.Tab destroyOnClose title={tabItems[0].title} key={tabItems[0].key}>
          <Manual />
        </Tabs.Tab>
        <Tabs.Tab destroyOnClose title={tabItems[1].title} key={tabItems[1].key}>
          <Automatic />
        </Tabs.Tab>
      </Tabs>
    </>
  );
};

export default Dynamic;
