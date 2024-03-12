import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async () => {
    try {
      // Check if identifier is in email format
      const isEmailFormat = /\S+@\S+\.\S+/.test(credentials.identifier);

      const requestBody = isEmailFormat
        ? { email: credentials.identifier, password: credentials.password }
        : { user_name: credentials.identifier, password: credentials.password };

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
        name='identifier'
        placeholder='Username or Email'
        value={credentials.identifier}
        onChange={handleInputChange}
      />
      <input
        type='password'
        name='password'
        placeholder='Password'
        value={credentials.password}
        onChange={handleInputChange}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
};
