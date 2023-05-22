import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './Login.css'


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    async function login(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8085/api/v1/employee/login", {
                email: email,
                password: password,
            }).then((res) => {
                console.log(res.data);
                if (res.data.message === "Email not exits") {
                    alert("Email not exits");
                }
                else if (res.data.message === "Login Success") {
                    navigate('/student');
                }
                else {
                    alert("Incorrect Email and Password not match");
                }


            }, fail => {
                console.error(fail);
            });
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
      <div className="container jumbotron mt-5">
        <div className="container-fluid p-5">
          <h2>Login</h2>
          <div className="row">
            <div className="col-sm-6">
              <form>
                <div className="form-group">
                  <label>Email</label>
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
                <button type="submit" className="btn btn-primary" onClick={login}>Login</button>
                <Link to="/register">
                  <button type="submit" className="btn btn-primary ml-3">Sign Up</button>
                </Link>
              </form>

            </div>  
          </div>
        </div>
      </div>    
    );
}
export default Login;