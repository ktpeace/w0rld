import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../components/DarkModeContext";
import { UserContext } from "./UserContext";
import glass from "../images/glass.png";
import typewriter from "../images/typewriter.png";
import lantern from "../images/lantern.png";
import pixie from "../images/pixie-avatar.jpeg";

const Header = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const { user, setUser } = useContext(UserContext);

  const handleLanternClick = () => setDarkMode((prev) => !prev);

  if (darkMode) {
    const body = document.querySelector("body");
    if (!body.classList.contains("dark-mode")) body.classList.add("dark-mode");
  } else {
    const body = document.querySelector("body");
    if (body.classList.contains("dark-mode"))
      body.classList.remove("dark-mode");
  }

  const validateLogin = (e) => {
    e.preventDefault();
    const userInfo = { username: username, level: 3 };
    if (password) {
      localStorage.setItem("user", userInfo);
      setUser(userInfo);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.setItem("user", null);
  };

  return (
    <nav>
      <Link to="/" className="home">
        <img src={typewriter} alt="typewriter" />
      </Link>
      <div className="navbar">
        <ul className="nav-main">
          <Link to="/updates">
            <li className="nav-main-item">
              <div className="image-bag nav-img-one">
                <img className="nav-main-icon" src={glass} alt="glass" />
              </div>
              <span className="nav-main-text">Updates</span>
            </li>
          </Link>

          <Link to="/tasks">
            <li className="nav-main-item">
              <div className="image-bag nav-img-two">
                <img className="nav-main-icon" src={glass} alt="glass" />
              </div>
              <span className="nav-main-text">Tasks</span>
            </li>
          </Link>

          <Link to="/praxis">
            <li className="nav-main-item">
              <div className="image-bag nav-img-three">
                <img className="nav-main-icon" src={glass} alt="glass" />
              </div>
              <span className="nav-main-text">Praxis</span>
            </li>
          </Link>

          <Link to="/groups">
            <li className="nav-main-item">
              <div className="image-bag nav-img-four">
                <img className="nav-main-icon" src={glass} alt="glass" />
              </div>
              <span className="nav-main-text">Groups</span>
            </li>
          </Link>

          <Link to="/players">
            <li className="nav-main-item">
              <div className="image-bag nav-img-five">
                <img className="nav-main-icon" src={glass} alt="glass" />
              </div>
              <span className="nav-main-text">Players</span>
            </li>
          </Link>
        </ul>
        <div className="right-side">
          <div className="lantern-set" onClick={handleLanternClick}>
            <img src={lantern} alt="lantern" className="lantern" />
            <span>LIGHT/DARK</span>
          </div>
          {!user ? (
            <div className="login">
              <form>
                <div className="login-group">
                  <div className="login-set">
                    <label htmlFor="username">Username:</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="login-set">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    className="login-button"
                    onClick={(e) => validateLogin(e)}
                  >
                    Log In
                  </button>
                </div>
                <p className="signup">
                  <span>New? </span>
                  <Link to="/register" className="signup-link">
                    Sign Up Here
                  </Link>
                </p>
              </form>
            </div>
          ) : (
            <div className="logged-in">
              <Link to="/profile">
                <img
                  src={pixie}
                  alt="avatar"
                  className="navatar"
                  title="profile"
                />
              </Link>
              <span onClick={logout} className="logout">
                Log Out
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
