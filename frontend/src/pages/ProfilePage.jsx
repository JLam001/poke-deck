import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("accessToken");
        const response = await fetch("http://localhost:3000/api/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error("Failed to fetch user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {user && (
        <>
          <p>User Name: {user.user_name}</p>
          <p>User ID: {user.user_id}</p>
          <p>Email: {user.email}</p>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
