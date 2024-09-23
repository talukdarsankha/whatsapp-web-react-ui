import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Status from "./Components/Status/Status";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";



function App() {
  return (
    <div>
       <Routes>
         <Route path="/" element={<HomePage/>} />
         <Route path="/profile" element={<HomePage/>} />
         <Route path="/status" element={<Status/>} />
         <Route path="/status/:userId" element={<Status/>} />

         <Route path="/signin" element={<Login/>} />
         <Route path="/signup" element={<Register/>} />
         
       </Routes>
    </div>
  );
}

export default App;
