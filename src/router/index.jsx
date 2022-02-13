import Nav from "../components/Nav";
import Static from "../pages/Static";
import Dynamic from "../pages/Dynamic";
import Login from "../pages/Login";
import Register from "../pages/Register";


/* const router = [
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
    ],
  },
]; */

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
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/dynamic",
        element: <Dynamic />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
];

export default router;
