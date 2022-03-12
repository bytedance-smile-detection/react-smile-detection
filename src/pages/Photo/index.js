import React from "react";
import { useNavigate } from "react-router-dom";
import SvgIcon from "../../components/SvgIcon";
import "./index.css";

const Photo = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/Dynamic");
  };

  return (
    <>
      <div className="px-6 pt-4">
        <div onClick={goBack}>
          <SvgIcon name="arrow-left" width={32} height={32} />
        </div>
      </div>
      <div className="main mt-6 rounded-t-3xl"></div>
    </>
  );
};

export default Photo;
