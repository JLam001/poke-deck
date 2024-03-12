import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { UserPortal } from "./pages/UserPortal";
import { ProfilePage } from "./pages/ProfilePage";
import { RegistrationPage } from "./pages/RegistrationPage";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/user' element={<UserPortal />} />
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='/profile/:username' element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};
