import React from "react";

const Contact = () => {
  return (
    <div>
      <main className="center-page">
        <h1>Contact</h1>
        <form action="" method="post" className="contact-form">
          <label htmlFor="comments">
            Ohoo ya got some juicy comments fer us?
          </label>
          <textarea name="comments" id="comments" rows="5" cols="33" required />
          <input type="submit" value="Waste Time" />
        </form>
      </main>
    </div>
  );
};

export default Contact;
