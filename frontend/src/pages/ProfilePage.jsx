import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

export const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get location state using useLocation hook
  const location = useLocation();

  useEffect(() => {
    const { userId } = location.state || {};

    const fetchUserData = async () => {
      try {
        const token = Cookies.get("accessToken");

        if (token && userId) {
          // Ensure username is not null
          const response = await fetch(`http://localhost:3000/user/${userId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            setError("Failed to fetch user data");
          }
        } else {
          setError("Invalid username or token");
        }
      } catch (error) {
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [location.state]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      {user ? (
        <>
          <p>User Name: {user.user_name}</p>
          <p>User ID: {user.user_id}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </>
      ) : (
        <p>User data not available</p>
      )}
    </div>
  );
};
