import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Authors from "./components/Authors";
import Quotes from "./components/Quotes.jsx";
import Categories from "./components/Categories";
import LandingPage from "./components/LandingPage";
import Quote from "./components/Quote";
import Author from "./components/Author";
import Category from "./components/Category";
import Error from "./components/Error";
import Login from "./components/Dashboard/Login.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Search from "./components/Search.jsx";
// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";
import Cookies from "js-cookie";
import AddMultipleQuotesPage from "./components/Dashboard/AddMultipleQuotesPage.jsx";

// register Swiper custom elements
register();

const PrivateRoute = ({ element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return element;
};

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
        path: "/quotes",
        element: <Quotes />,
      },
      {
        path: "/quotes/:slug",
        element: <Quote />,
      },
      {
        path: "/quotes/search",
        element: <Search />,
      },
      {
        path: "/authors",
        element: <Authors />,
      },
      {
        path: "/authors/:author",
        element: <Author />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/categories/:category",
        element: <Category />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <PrivateRoute element={<Dashboard />} />,
      },
      {
        path: "/add-multiple-quotes",
        element: <PrivateRoute element={<AddMultipleQuotesPage />} />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
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
