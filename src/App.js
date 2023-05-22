import Student from "./components/student";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes,Route } from "react-router-dom";


function App() {
  return (
    <div >
   
      <BrowserRouter>
            <Routes>
              <Route path="/student" element= {<Student/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/" element={<Login/>} />
            </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
