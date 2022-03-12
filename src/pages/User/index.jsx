import React from "react";
import { useState, useEffect } from "react";
import NotLoggedIn from "../../components/NotLoggedIn";
import LoggedIn from "../../components/LoggedIn";

const User = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("token") ? true : false);
  }, []);

  return isLoggedIn !== null ? (
    isLoggedIn === true ? (
      <LoggedIn />
    ) : (
      <NotLoggedIn />
    )
  ) : (
    <></>
  );
};

export default User;
