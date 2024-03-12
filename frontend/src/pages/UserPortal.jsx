import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const UserPortal = () => {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = Cookies.get("accessToken");
        if (!token) {
          throw new Error("Access token not found");
        }

        const decodedToken = parseJwt(token);
        if (
          !decodedToken ||
          !decodedToken.UserInfo ||
          !decodedToken.UserInfo.user_id
        ) {
          throw new Error("Invalid user token");
        }

        const userId = decodedToken.UserInfo.user_id;
        setUserId(userId);
      } catch (error) {
        console.error("Failed to fetch user ID:", error.message);
      }
    };

    fetchUserId();
  }, []);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const handleLogout = async () => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        throw new Error("Access token not found");
      }

      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        Cookies.remove("accessToken");
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
      <p>Welcome!</p>
      <button onClick={handleLogout}>Logout</button>
      <br />
      {/* Updated Link to include the username in the URL */}
      <Link to={`/profile/${userId}`} state={{ userId: userId }}>
        Go to Profile
      </Link>
    </div>
  );
};
