import React, { useEffect } from "react";
import "./../App.css";

export const Logout = () => {

  useEffect(() => {
    localStorage.clear();
    alert("Logout Successful!");
  }, []);

  return (
    <div className="submit-form">
        <h2>
            Logout Successful!
        </h2>
        <a href="/login">Login again here</a>
    </div>
  );
};
