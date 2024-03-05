import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const LoginPage = () => {
  const [identifier, setIdentifier] = useState(""); // Changed from username to identifier
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const isEmailFormat = /\S+@\S+\.\S+/.test(identifier); // Check if identifier is in email format

      const requestBody = isEmailFormat
        ? { email: identifier, password }
        : { user_name: identifier, password };

      const response = await fetch("http://localhost:3000/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
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
        placeholder='Username or Email' // Changed placeholder text
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)} // Changed from setUsername to setIdentifier
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
