import React, { useState } from "react";
import {
  // createHashRouter,
  RouterProvider,
  // Outlet,
  createBrowserRouter,
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

// import DarkModeContext from "./components/DarkModeContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );

  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // const Layout = () => {
  //   return (
  //     <>
  //       {/* <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}> */}
  //       <Header
  //         isLoggedIn={isLoggedIn}
  //         setIsLoggedIn={setIsLoggedIn}
  //         isDarkMode={isDarkMode}
  //         toggleDarkMode={toggleDarkMode}
  //       />
  //       <Outlet />
  //       <Footer />
  //       {/* </DarkModeContext.Provider> */}
  //     </>
  //   );
  // };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <Home />
          <Footer />
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          <Header
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <About isDarkMode={isDarkMode} />
          <Footer isDarkMode={isDarkMode} />
        </>
      ),
    },
    {
      path: "/badges",
      element: (
        <>
          <Header
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <Badges isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} />
          <Footer isDarkMode={isDarkMode} />
        </>
      ),
    },
    {
      path: "/contact",
      element: (
        <>
          <Header
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <Contact isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} />
          <Footer isDarkMode={isDarkMode} />
        </>
      ),
    },
    {
      path: "/disclaimer",
      element: (
        <>
          <Header
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <Disclaimer isDarkMode={isDarkMode} />
          <Footer isDarkMode={isDarkMode} />
        </>
      ),
    },
    {
      path: "/donate",
      element: (
        <>
          <Header
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <Donate isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} />
          <Footer isDarkMode={isDarkMode} />
        </>
      ),
    },
    {
      path: "/events",
      element: (
        <>
          <Header
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <Events isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} />
          <Footer isDarkMode={isDarkMode} />
        </>
      ),
    },
    {
      path: "/groups",
      element: (
        <>
          <Header
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <Groups isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} />
          <Footer isDarkMode={isDarkMode} />
        </>
      ),
    },
    {
      path: "/players",
      element: (
        <>
          <Header
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <Players isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} />
          <Footer isDarkMode={isDarkMode} />
        </>
      ),
    },
    {
      path: "/praxis",
      element: (
        <>
          <Header
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <Praxis isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} />
          <Footer isDarkMode={isDarkMode} />
        </>
      ),
    },
    {
      path: "/preview/:id",
      element: (
        <>
          <Header
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <Preview isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} />
          <Footer isDarkMode={isDarkMode} />
        </>
      ),
    },
    {
      path: "/profile",
      element: (
        <>
          <Header
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <Profile isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} />
          <Footer isDarkMode={isDarkMode} />
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
          <Header
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <Register isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} />
          <Footer isDarkMode={isDarkMode} />
        </>
      ),
    },
    {
      path: "/tasks",
      element: (
        <>
          <Header
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <Tasks isLoggedIn={isLoggedIn} isDarkMode={isDarkMode} />
          <Footer />
        </>
      ),
    },
    {
      path: "/tasks/:id",
      element: (
        <>
          <Header
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <Task isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} />
          <Footer isDarkMode={isDarkMode} />
        </>
      ),
    },
    {
      path: "/terms",
      element: (
        <>
          <Header
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <Terms isDarkMode={isDarkMode} />
          <Footer isDarkMode={isDarkMode} />
        </>
      ),
    },
    {
      path: "/territory",
      element: (
        <>
          <Header
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <Territory isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} />
          <Footer isDarkMode={isDarkMode} />
        </>
      ),
    },
    {
      path: "/updates",
      element: (
        <>
          <Header
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <Updates isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} />
          <Footer isDarkMode={isDarkMode} />
        </>
      ),
    },
  ]);

  // createHashRouter([
  //   {
  //     path: "/",
  //     element: <Layout />,
  //     children: [
  //       {
  //         path: "/",
  //         element: <Home />,
  //       },
  //       {
  //         path: "/about",
  //         element: <About />,
  //       },
  //       {
  //         path: "/badges",
  //         element: <Badges />,
  //       },
  //       {
  //         path: "/contact",
  //         element: <Contact />,
  //       },
  //       {
  //         path: "/disclaimer",
  //         element: <Disclaimer />,
  //       },
  //       {
  //         path: "/donate",
  //         element: <Donate />,
  //       },
  //       {
  //         path: "/events",
  //         element: <Events />,
  //       },
  //       {
  //         path: "/groups",
  //         element: <Groups />,
  //       },
  //       {
  //         path: "/players",
  //         element: <Players />,
  //       },
  //       {
  //         path: "/praxis",
  //         element: <Praxis />,
  //       },
  //       {
  //         path: "/preview/:id",
  //         element: <Preview />,
  //       },
  //       {
  //         path: "/profile",
  //         element: <Profile />,
  //       },
  //       {
  //         path: "/register",
  //         element: <Register />,
  //       },
  //       {
  //         path: "/tasks",
  //         element: <Tasks isLoggedIn={isLoggedIn} isDarkMode={isDarkMode} />,
  //       },
  //       {
  //         path: "/tasks/:id",
  //         element: <Task />,
  //       },
  //       {
  //         path: "/terms",
  //         element: <Terms />,
  //       },
  //       {
  //         path: "/territory",
  //         element: <Territory />,
  //       },
  //       {
  //         path: "/updates",
  //         element: <Updates />,
  //       },
  //     ],
  //   },
  // ]);

  return (
    <div className="App">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
