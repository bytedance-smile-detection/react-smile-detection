import React from "react";
import { Image } from "antd-mobile";
import "./index.css";

const Judgment = (props) => {
  const { icon, text } = props;

  return (
    <span className="flex items-center fixed px-4 py-2 right-1/2 translate-x-1/2 bg-gray-100 rounded-3xl font-bold">
      <Image className="mr-2" src={require(`../../assets/icons/${icon}.svg`)} width={24} height={24} />
      {text}
    </span>
  );
};

export default Judgment;
