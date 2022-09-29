import React from "react";

const GetInTouch = ({ heading, message, email }) => {
  return (
    <>
      <h2
        className="display-4 pb-3 text-center"
        style={{ background: "##F8F9FB" }}
      >
        {heading}
      </h2>
      <p className="lead text-center pb-3">
        {message},{" "}
        <a className="text-decoration-none" href={`mailto:${email}`}>
          {email}
        </a>
        .
      </p>
    </>
  );
};

export default GetInTouch;
