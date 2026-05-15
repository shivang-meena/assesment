import { BrowserRouter, Routes, Route } from "react-router-dom";
import Otpverification from "./pages/Otpverification/Otpverification.jsx"
import Registration from "./pages/Registeration/Registeration.jsx";
import Login from "./pages/Login/Login.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import WelcomePage from "./pages/Welcome/Welcome.jsx";

const App=()=>{
 return(
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

export default App;