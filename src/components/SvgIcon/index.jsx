import React from "react";
import { Image } from "antd-mobile";

const SvgIcon = (props) => {
  const { name, width, height } = props;

  return (
    <Image
      src={require(`../../assets/icons/${name}.svg`)}
      width={width}
      height={height}
    />
  );
};

export default SvgIcon;
