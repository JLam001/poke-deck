import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface DecodedToken {
  UserInfo: {
    user_id: string;
  };
}

export const UserPage: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = Cookies.get("accessToken");
        if (!token) {
          throw new Error("Access token not found");
        }

        const decodedToken = parseJwt(token);
        if (!decodedToken) {
          throw new Error("Invalid user token");
        }

        const userId = decodedToken.UserInfo.user_id;
        setUserId(userId);
      } catch (error) {
        console.error("Failed to fetch user ID:");
      }
    };

    fetchUserId();
  }, []);

  const parseJwt = (token: string): DecodedToken | null => {
    try {
      // Attempt to decode the JWT token
      const decoded = JSON.parse(atob(token.split(".")[1])) as DecodedToken;

      // Check if the decoded token has the expected structure
      if (!decoded || !decoded.UserInfo || !decoded.UserInfo.user_id) {
        throw new Error("Invalid token structure");
      }

      // If everything is fine, return the decoded token
      return decoded;
    } catch (error) {
      // If an error occurs during decoding or validation
      if (error instanceof Error) {
        // Log the specific error message
        console.error("Failed to parse JWT:", error.message);
      } else {
        // If the error is not of type Error, log a generic message
        console.error("Failed to parse JWT: An unknown error occurred");
      }

      // Return null to indicate failure
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
        // Successful logout
        Cookies.remove("accessToken");
        navigate("/"); // Assuming navigate function is available and properly configured
      } else {
        // Handle non-successful response
        const errorMessage = await response.text();
        throw new Error(`Logout failed with status ${response.status}: ${errorMessage}`);
      }
    } catch (error: unknown) {
      // Handle any errors occurred during the process
      if (error instanceof Error) {
        console.error("Logout failed:", error.message);
      } else {
        console.error("Logout failed: An unknown error occurred");
      }
    }
  };

  return (
    <div>
      <h2>User Portal</h2>
      <p>Welcome!</p>
      <button onClick={handleLogout}>Logout</button>
      <br />
      {userId && (
        <Link to={`/user/profile/${userId}`} state={{ userId: userId }}>
          Go to Profile
        </Link>
      )}
      <br/>
      <Link to={`/user/deck`} state={{ userId: userId }}>
        Go to Deck
      </Link>
    </div>
  );
};
