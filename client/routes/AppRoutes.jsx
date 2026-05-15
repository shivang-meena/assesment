import { BrowserRouter, Routes, Route } from "react-router-dom";
import Otpverification from "../src/pages/Registeration/Registeration.jsx"
import Registration from "../src/pages/Login/Login.jsx";
import Login from "../src/pages/Login/Login.jsx";
import Homepage from "../src/pages/Homepage/Homepage.jsx";
import WelcomePage from "../src/pages/Welcome/Welcome.jsx"

export default function AppRoutes() {
    return (
        <BrowserRouter>
  <Routes>
      <Route path="/" element={<Homepage/>}/>
       <Route path="/Registration" element={<Registration/>}/>
       <Route path="/Login" element={<Login/>} />
       <Route path="/verification" element={<Otpverification/>}/>
       <Route path="/Welcome" element={<WelcomePage/>}/>
  </Routes>
  </BrowserRouter>
    );
}