import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const SvgIcon = props => {
  const { iconClass, fill } = props;

  return (
      <svg className="svg-class">
        <use xlinkHref={"#icon-" + iconClass}/>
      </svg>
  );
};

SvgIcon.propTypes = {
  // svg名字
  iconClass: PropTypes.string.isRequired,
  // 填充颜色
  fill: PropTypes.string
};

SvgIcon.defaultProps = {
  fill: "#909399"
};

export default SvgIcon;