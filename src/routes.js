import { Navigate, useRoutes } from "react-router-dom";
// import Register from "./views/register";
// import Home from "./views/home";
// import Reward from "./views/reward";
// import App from "./App";
import Home from "./views/Home";

export const AppRoutes = () =>
  useRoutes([
    { path: "/", element: <Home /> },
    {
      path: "/",
      children: [
        { path: "home", element: <Home /> },
        // { path: "reward", element: <Reward /> },
      ],
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
