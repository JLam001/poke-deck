import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { UserPage } from "./pages/UserPage";
import { ProfilePage } from "./pages/ProfilePage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { Navbar } from "./components/nav/Navbar";
import { DeckPage } from "./pages/DeckPage";

export const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/user' element={<UserPage />} />
        <Route path='/user/profile/:username' element={<ProfilePage />} />
        <Route path='/user/deck' element={<DeckPage />} />
        <Route path='/register' element={<RegistrationPage />} />
      </Routes>
    </Router>
  );
};
