import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import reducers from "./reducers";

import App from "./App";
import Home from "./components/home/Home.jsx";
import Auth from "./components/auth/Auth.jsx";
import { PostDeatils } from "./components/postDetails/PostDeatils.jsx";
import "./index.css";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const user = JSON.parse(localStorage.getItem("profile"));

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h3>Page you are trying to is not created yet</h3>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/posts",
        element: <Home />,
      },
      {
        path: "/posts/search",
        element: <Home />,
      },
      {
        path: "/auth",
        element: (!user ? <Auth /> : <Navigate to="/posts" replace />),
      },
      {
        path: "/posts/:id",
        element: <PostDeatils />,
      },
    ],
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
