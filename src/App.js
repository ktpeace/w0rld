import React, { useState } from "react";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Badges from "./pages/Badges";
import Contact from "./pages/Contact";
import Disclaimer from "./pages/Disclaimer";
import Donate from "./pages/Donate";
import Events from "./pages/Events";
import Groups from "./pages/Groups";
import Players from "./pages/Players";
import Praxis from "./pages/Praxis";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import Terms from "./pages/Terms";
import Territory from "./pages/Territory";

import "./App.css";
import Task from "./pages/Task";
import Preview from "./pages/Preview";
import Updates from "./pages/Updates";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );

  const Layout = () => {
    return (
      <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Outlet />
        <Footer />
      </>
    );
  };

  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/badges",
          element: <Badges />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/disclaimer",
          element: <Disclaimer />,
        },
        {
          path: "/donate",
          element: <Donate />,
        },
        {
          path: "/events",
          element: <Events />,
        },
        {
          path: "/groups",
          element: <Groups />,
        },
        {
          path: "/players",
          element: <Players />,
        },
        {
          path: "/praxis",
          element: <Praxis />,
        },
        {
          path: "/preview/:id",
          element: <Preview />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/tasks",
          element: <Tasks isLoggedIn={isLoggedIn} />,
        },
        {
          path: "/tasks/:id",
          element: <Task />,
        },
        {
          path: "/terms",
          element: <Terms />,
        },
        {
          path: "/territory",
          element: <Territory />,
        },
        {
          path: "/updates",
          element: <Updates />,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
