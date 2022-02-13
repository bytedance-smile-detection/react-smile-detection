import Nav from "../components/Nav";
import Static from "../pages/Static";
import Dynamic from "../pages/Dynamic";
import Login from "../pages/Login";
import LoginRegist from "../pages/LoginRegist";
import UserSpace from "../pages/UserSpace";
import Regist from "../pages/Regist";

const router = [
  {
    path: "/",
    element: <Nav />,
    children: [
      {
        index: true,
        element: <Static />,
      },
      {
        path: "/dynamic",
        element: <Dynamic />,
      },
      {
        path: "/auth",
        element: <LoginRegist />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/regist",
        element: <Regist />,
      },
      {
        path: "/userspace",
        element: <UserSpace />,
      },
    ],
  },
];

export default router;
