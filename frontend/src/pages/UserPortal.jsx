import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const UserPortal = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the username from the JWT token stored in cookies
    const token = Cookies.get("accessToken");
    if (token) {
      const decodedToken = parseJwt(token);
      if (
        decodedToken &&
        decodedToken.UserInfo &&
        decodedToken.UserInfo.user_name
      ) {
        setUsername(decodedToken.UserInfo.user_name);
      }
    }
  }, []);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const handleLogout = async () => {
    const token = Cookies.get("accessToken");
    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.ok) {
        // Clear the access token from cookies
        Cookies.remove("accessToken");
        // Navigate the user to the login page
        navigate("/");
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div>
      <h2>User Portal</h2>
      {username && <p>Welcome {username}!</p>}
      <button onClick={handleLogout}>Logout</button>
      <br />
      <Link to='/profile'>Go to Profile</Link>
    </div>
  );
};
