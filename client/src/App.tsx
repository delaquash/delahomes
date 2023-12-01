import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignUp from "./pages/Signup";
import Signin from "./pages/Signin";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Headers from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return(
    <BrowserRouter>
      <Headers />
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/about" element={<About />}  />
        <Route path="/signin" element={<Signin />}  />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
