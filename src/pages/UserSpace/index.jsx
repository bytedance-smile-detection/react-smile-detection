import React from 'react';
import { connect } from 'react-redux';
import "./index.css";

const UserSapce = (props) => {
  const {token} = props;
  const handleLogin = () => {}
  return (
    <div className="flex flex-col justify-center items-center">
      <div className='login-title'>Create<br/>your account</div>
    </div>
  );
}
export default connect((state) => state.user, {})(
  UserSapce
);