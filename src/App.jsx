import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import './App.scss'
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
const Products = React.lazy(() => import("product_mf/ProductRouter"));

const Layout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/*",
        element: <Products />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
]);

const App = () => (
  <div>
    <Suspense fallback={<div>Loading..</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
