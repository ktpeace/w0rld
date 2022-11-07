import React from "react";

const Register = () => {
  return (
    <div>
      <main className="center-page">
        <h1>Register</h1>
        <form action="" method="post" className="contact-form">
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="username" />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="text" name="password" id="password" />
          </div>
          <input type="submit" value="GIT URS" />
        </form>
      </main>
    </div>
  );
};

export default Register;
