import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <main className="center-page">
        <p className="home-intro-p">
          WorldZero is a Collaborative Production Game. Players build characters
          by completing tasks for their groups and increasing their Score. The
          goals of play include meeting new people, exploring the city, and
          participating in non-consumer leisure activities. We are still in
          beta, any and all feedback is appreciated...
          <Link to="/about" className="read-more">
            more about the game
          </Link>
        </p>
      </main>
    </div>
  );
};

export default Home;
