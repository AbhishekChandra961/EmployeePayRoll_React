import "./App.css";
import EmployeePayroll from "./Components/EmployeePayroll";
import Home from "./Components/Home";
import { Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/employeelist" element={<EmployeePayroll />}></Route>
        <Route path="/home/:id" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
