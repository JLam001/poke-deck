import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Credential {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const [credential, setCredential] = useState<Credential>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>(""); // Initialize error state
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredential(prevState => ({
      ...prevState,
      [name]: value
    }) as Credential); // Asserting the type of state here
  };  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const requestBody = {
        email: credential.email,
        password: credential.password
      };
  
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
    <div className="flex justify-center items-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your email and password to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error if it exists */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  type="email"
                  autoComplete="email"
                  value={credential.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  required
                  type="password"
                  autoComplete="current-password"
                  value={credential.password}
                  onChange={handleChange}
                />
              </div>
              <Button className="w-full" type="submit">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
        <div className="p-4">
          <p className="text-sm text-center">Don't have an account? <a href="/register" className="text-blue-500">Register here</a></p>
        </div>
      </Card>
    </div>
  );
};

