import React, { Suspense, useState } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.scss";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout"
import ProductGrid from './pages/ProductGrid/ProductGrid'
import UserGrid from "./pages/UserGrid/UserGrid";
const Products = React.lazy(() => import("product_mf/ProductRouter"));

const Layout = ({ loggedIn, setLoggedIn }) => {
  return (
    <div className="app">
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Outlet />
      <Footer />
    </div>
  );
};

const App = () => {
  
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("token") == null ? false : true
  );
  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: <Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/products/*",
          element: <Products loggedIn={loggedIn} setLoggedIn={setLoggedIn} />,
        },
        {
          path: "/auth/login",
          element: <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />,
        },
        {
          path: "/auth/register",
          element: <Register loggedIn={loggedIn} setLoggedIn={setLoggedIn} />,
        },
        {
          path: "/profile",
          element: <Profile loggedIn={loggedIn} setLoggedIn={setLoggedIn} />,
        },
        {
          path: "/cart",
          element: <Cart loggedIn={loggedIn} setLoggedIn={setLoggedIn} />,
        },
        {
          path: "/checkout",
          element: <Checkout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />,
        },
        {
          path: "/admin/products",
          element: (
            <ProductGrid loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          ),
        },
        {
          path: "/admin/users",
          element: (
            <UserGrid loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          ),
        },
      ],
    },
  ]);

  return (
    <div>
      <Suspense fallback={<div>Loading..</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
