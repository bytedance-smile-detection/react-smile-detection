import Nav from "../components/Nav";
import Static from "../pages/Static";
import Dynamic from "../pages/Dynamic";
import User from "../pages/User";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Photo from "../pages/Photo";

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
        path: "/user",
        element: <User />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/photo",
    element: <Photo />,
  },
];

export default router;
