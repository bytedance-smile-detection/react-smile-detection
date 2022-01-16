import { useRoutes } from "react-router-dom";
import router from "./router";

const App = () => {
  return useRoutes(router);
};

export default App;
