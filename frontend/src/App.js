import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Sales from "./pages/Sales";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Register from "./pages/Register";

export default function App(){
  return(
    <BrowserRouter>
     <Navbar/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/inventory" element={<Inventory/>}/>
        <Route path="/sales" element={<Sales/>}/>
      </Routes>
    </BrowserRouter>
  )
}