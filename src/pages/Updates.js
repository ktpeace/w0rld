import React, { useContext } from "react";
// import { Link } from "react-router-dom";
import { DarkModeContext } from "../components/DarkModeContext";
import sloth from "../images/sloth.jpg";
import barnOwl from "../images/barn-owl.png";
import branch from "../images/branch.png";
import sunflower from "../images/sunflower.png";
// import { tasks } from "../data/tasks-data";

const Updates = () => {
  const { darkMode } = useContext(DarkModeContext);

  // const friendUsername = "Pixie";
  // const username = "Fakename McBiddlesby";
  // const level = 2;
  // const postCount = 1025;
  // const completedTasks = 5;
  // const workingTasks = 3;
  // const totalTasks = 10;
  // const eventName = "Putting Things Out With Rain";
  // const eventStatus = "no response";
  // const eventDate = "12/03/2022";

  // const dummyItem = (
  //   <li className="task-li">
  //     <div className="task-item">
  //       <div className="task-item-name">
  //         <div className="group-color"></div>
  //         <Link className="task-name">Odyssey</Link>
  //       </div>
  //       <span className="task-status">missing requirements</span>
  //     </div>
  //     <div className="task-options">
  //       <Link to="./1" className="task-options-link">
  //         edit
  //       </Link>
  //       <Link to="/preview/1" className="task-options-link">
  //         preview
  //       </Link>
  //     </div>
  //   </li>
  // );

  // const dummyComment = (
  //   <li className="comment-li">
  //     <div className="task-item">
  //       <div className="task-item-name">
  //         <div className="group-color"></div>
  //         <Link className="task-name">Counting by Pixie</Link>
  //       </div>
  //     </div>
  //     <div className="friend-comment">
  //       <img className="friend-avatar" src={sloth} alt="friend avatar"></img>
  //       <div className="friend-comment-pair">
  //         <span className="friend-says">{friendUsername} says:</span>
  //         <span className="friend-comment-text">
  //           If you go swimming in the air you don't have to towel off after
  //         </span>
  //       </div>
  //     </div>
  //   </li>
  // );
  const updatesText = document.querySelectorAll(".updates-text");

  if (darkMode) {
    updatesText.forEach((div) => {
      if (div.classList.contains("updates-text-light")) {
        div.classList.remove("updates-text-light");
        console.log("removed light");
      }
      div.classList.add("updates-text-dark");
    });
  } else {
    updatesText.forEach((div) => {
      if (div.classList.contains("updates-text-dark")) {
        div.classList.remove("updates-text-dark");
      }
      div.classList.add("updates-text-light");
    });
  }

  return (
    <main className="updates-page">
      <div className="image-pair">
        <img src={barnOwl} alt="watercolor barn owl" className="barn-owl"></img>

        <div className="updates-text updates-text-light first">
          <h2>Global Completed Tasks</h2>
          <ul>
            <li>
              <div className="li-header">
                <img src={sloth} alt="avatar" />
                <div className="header-date">
                  <span className="date">Oct 25 2022</span>
                  <h4>copystar completed Odyssey </h4>
                </div>
              </div>
              <div className="text-body">
                So I work in a library that is currently suffering from a laptop
                theft problem. Students leave their things in their cubicle or
                desk to go to the bathroom, and when they return they find their
                laptop is no longer there. <br></br>Seating can be a premium in
                the library, especially during mid-terms and exam time, and so
                students are loathe to take all their things into the bathroom
                with them because if they do, it's likely that they will lose
                their prime study space.<br></br> A mundane problem and yet not.
              </div>
            </li>
            <li>
              <div className="li-header">
                <img src={sloth} alt="avatar" />
                <div className="header-date">
                  <span className="date">Oct 25 2022</span>
                  <h4>copystar completed Mass Transit 42 Second Friends</h4>
                </div>
              </div>
              <div className="text-body">
                So I work in a library that is currently suffering from a laptop
                theft problem. Students leave their things in their cubicle or
                desk to go to the bathroom, and when they return they find their
                laptop is no longer there.
              </div>
            </li>
          </ul>
          <span className="more">More</span>
        </div>
      </div>
      <div className="image-pair">
        <div className="updates-text updates-text-light two">
          <h2>Activity on Your Tasks</h2>
          <ul>
            <li>
              <div className="standalone-li-header">
                <img src={sloth} alt="avatar" />
                <div className="header-date">
                  <span className="date">Oct 25 2022</span>
                  <h4>copystar voted for your task Odyssey!</h4>
                </div>
              </div>
            </li>
            <li>
              <div className="li-header">
                <img src={sloth} alt="avatar" />
                <div className="header-date">
                  <span className="date">Oct 25 2022</span>
                  <h4>copystar commented on your task Odyssey</h4>
                </div>
              </div>
              <div className="text-body">
                So I work in a library that is currently suffering from a laptop
                theft problem. Students leave their things in their cubicle or
                desk to go to the bathroom, and when they return they find their
                laptop is no longer there. <br></br>Seating can be a premium in
                the library, especially during mid-terms and exam time, and so
                students are loathe to take all their things into the bathroom
                with them because if they do, it's likely that they will lose
                their prime study space.<br></br> A mundane problem and yet not.
              </div>
            </li>
          </ul>
          <span className="more">More</span>
        </div>
        <img src={branch} alt="bare branch" className="branch" />
      </div>
      <div className="image-pair">
        <img src={sunflower} alt="sunflower" className="sunflower" />

        <div className="updates-text updates-text-light three">
          <h2>Friend/Foe Requests</h2>
          <ul>
            <li>
              <div className="standalone-li-header">
                <img src={sloth} alt="avatar" />
                <div className="header-date">
                  <span className="date">Oct 25 2022</span>
                  <h4>copystar wants to be friends!</h4>
                </div>
              </div>
            </li>
            <li>
              <div className="standalone-li-header">
                <img src={sloth} alt="avatar" />
                <div className="header-date">
                  <span className="date">Oct 25 2022</span>
                  <h4>copystar wants to be friends!</h4>
                </div>
              </div>
            </li>
            <li>
              <div className="standalone-li-header">
                <img src={sloth} alt="avatar" />
                <div className="header-date">
                  <span className="date">Oct 25 2022</span>
                  <h4>copystar wants to be friends!</h4>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Updates;
