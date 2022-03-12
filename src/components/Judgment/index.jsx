import React from "react";
import { Image } from "antd-mobile";
import "./index.css";

const Judgment = (props) => {
  const { icon, text } = props;

  return (
    <span className="flex items-center fixed px-5 py-3 right-1/2 translate-x-1/2 bg-white rounded-3xl font-bold">
      <Image
        className="mr-2"
        src={require(`../../assets/images/${icon}.png`)}
        width={24}
        height={24}
      />
      {text}
    </span>
  );
};

export default Judgment;
