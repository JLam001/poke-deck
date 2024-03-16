import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

interface User {
  user_name: string;
  user_id: string;
  email: string;
  role: string;
}

export const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation(); // Remove the type argument

  useEffect(() => {
    const { state } = location;
    const { userId } = state || {};

    const fetchUserData = async () => {
      try {
        const token = Cookies.get("accessToken");

        if (token && userId) {
          const response = await fetch(`http://localhost:3000/user/${userId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData: User = await response.json();
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
  }, [location]);

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
