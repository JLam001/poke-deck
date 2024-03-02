import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_name: username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { accessToken } = data;

        // Save JWT token to cookie
        Cookies.set("accessToken", accessToken);

        // Navigate to the user page
        navigate("/user");
      } else {
        const data = await response.json();
        setError(data.message || "Error logging in");
      }
    } catch (error) {
      setError("Error logging in");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
};
