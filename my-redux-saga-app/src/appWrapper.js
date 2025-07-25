import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AppWrapper = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (!user) {
      navigate("/login"); // redirect if not logged in
    }
  }, []);

  return <>{children}</>;
};

export default AppWrapper;
