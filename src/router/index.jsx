import Nav from "../components/Nav";
import Static from "../pages/Static";
import Dynamic from "../pages/Dynamic";

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
    ],
  },
];

export default router;
