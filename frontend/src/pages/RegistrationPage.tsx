import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormData {
  user_name: string;
  email: string;
  password: string;
  role: string;
}

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    user_name: "",
    email: "",
    password: "",
    role: "" 
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data); // You can handle the response as needed
      // Clear form and any error messages
      setFormData({
        user_name: "",
        email: "",
        password: "",
        role: "" // Reset role to an empty string
      });
      setErrorMessage("");
      // Navigate or handle success accordingly
      navigate("/login");
    } catch (error) {
      setErrorMessage(
        "An error occurred while registering. Please try again later."
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Register</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="user_name"
                  name="user_name"
                  placeholder="Your username"
                  required
                  value={formData.user_name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  type="email"
                  value={formData.email}
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
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  name="role"
                  placeholder="User Role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                />
              </div>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <Button className="w-full" type="submit">
                Register
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
