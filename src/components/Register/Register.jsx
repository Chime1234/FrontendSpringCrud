import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {

    const [employeename, setEmployeename] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    async function save(event){
        event.preventDefault();
        try {
            await axios.post("http://localhost:8085/api/v1/employee/save", {
                employeename: employeename,
                email: email,
                password: password,
            });
            alert("Student Registration Successful");
        } catch (err){
            alert(err);
        }
        
    } 
    return (
      <div >
        <div className="container mt-4 ">
            <div className="card jumbotrondocker build --tag react .">
                <h1>Student Registration</h1>
                <form>
                    <div className="form-group">
                        <label> Student name</label>
                        <input type="text" className="form-control" id="employeename" placeholder="Enter Name"
                        value={employeename}
                        onChange={(event) => {
                            setEmployeename(event.target.value);
                        }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter Email Address"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter Password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary mt-4" onClick={save}>Register</button>
                    <Link to="/">
                        <button type="submit" className="btn btn-primary ml-3 mt-4">Log In</button>
                    </Link>
                </form>
            </div>
        </div>
      </div>
    );
  }
  
  export default Register;