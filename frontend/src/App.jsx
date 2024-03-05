import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { UserPortal } from "./pages/UserPortal";
// import { ProfilePage } from "./pages/ProfilePage";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/user' element={<UserPortal />} />
        {/* <Route path='/profile' element={<ProfilePage />} /> */}
      </Routes>
    </Router>
  );
};
