import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Authors from "./components/Authors";
import Header from "./components/Navbar";
import Quotes from "./components/Quotes.jsx";
import Categories from "./components/Categories";
import LandingPage from "./components/LandingPage";
import QOTD from "./components/QOTD.jsx";
import Quote from "./components/Quote";
import Author from "./components/Author";
import Category from "./components/Category";
import Error from "./components/Error";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/qotd",
        element: <Quotes />,
      },
      {
        path: "/quotes/:id",
        element: <Quote />,
      },
      {
        path: "/quotes",
        element: <Quotes />,
      },
      {
        path: "/authors/:author",
        element: <Author />,
      },
      {
        path: "/authors",
        element: <Authors />,
      },
      {
        path: "/categories/:category",
        element: <Category />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/qotd",
        element: <QOTD />,
      },
    ],
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);
