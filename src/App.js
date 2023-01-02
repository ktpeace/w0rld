import React, { useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./App.css";
import { DarkModeContext } from "./components/DarkModeContext";
import { UserContext } from "./components/UserContext";
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
import Task from "./pages/Task";
import Tasks from "./pages/Tasks/Tasks";
import Terms from "./pages/Terms";
import Territory from "./pages/Territory";
import Preview from "./pages/Preview";
import Updates from "./pages/Updates";

// 1. create context in separate file
// import { createContext } from "react";
// export const LevelContext = createContext(1);
// 2a. Import & use your context:
// import { LevelContext } from "./LevelContext.js";
// const level = useContext(LevelContext);
// 2b. feed it to the parent section:
/* <Section level={4}>
  <Heading>Sub-sub-heading</Heading>
  <Heading>Sub-sub-heading</Heading>
  <Heading>Sub-sub-heading</Heading>
</Section>; */
// 3. wrap children in provider:
// import { LevelContext } from './LevelContext.js';
// export default function Section({ level, children }) {
//   return (
//     <section className="section">
//       <LevelContext.Provider value={level}>
//         {children}
//       </LevelContext.Provider>
//     </section>
//   );
// }

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
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
        element: <Tasks />,
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

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div>
      <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
        <UserContext.Provider value={{ user, setUser }}>
          <RouterProvider router={router} />
        </UserContext.Provider>
      </DarkModeContext.Provider>
    </div>
  );
}

export default App;
