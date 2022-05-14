import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        email: "",
        password: "",
    });
    const [loginError, setLoginError] = useState(0);

    const updateFormField = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const loginUser = async () => {
        
            let response = await axios.post("https://cakeeey.herokuapp.com/api/user/login", formState);
            if(response.data.error==="Wrong email or password"){
                localStorage.setItem("accessToken", "");
                localStorage.setItem("refreshToken", "");
                setFormState({
                    email:"",
                    password:""
                })
                setLoginError(1)
                navigate("/login");
            }
            else{
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken);
                navigate("/profile");
            }
    };

    return (
        <React.Fragment>
               <section className="py-20" style={{height:"600px"}} >
                   <div style={{height:"100px"}}></div>
                <div className="position-relative container">
                    <div className="position-relative mw-4xl mx-auto">
                        <div className="position-absolute top-50 start-0 end-0 translate-middle-y ms-n6 me-n6" ></div>
                        <div className="position-relative py-16 pt-md-32 pb-md-20 px-4 px-sm-8 bg-white">
                            <div className="mw-lg mx-auto text-center">
                                <div className="d-inline-block h6 mb-14" href="#">
                                   
                                </div>
                                <h2 className="mb-8">Login</h2>
                                {loginError == 1 ? <div className="alert alert-danger">Login Error</div> : null}
                                <form action="">
                                    <input
                                        className="form-control form-control-lg mb-4"
                                        type="text"
                                        placeholder="Email"
                                        name="email"
                                        value={formState.email}
                                        onChange={updateFormField}
                                       
                                    ></input>
                                    <input
                                        className="form-control form-control-lg mb-4"
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={formState.password}
                                        onChange={updateFormField}
                                
                                    ></input>
                                    {/* <p>
                                        Don't have an account? <Link to="/Signup">Create one</Link>
                                    </p> */}
                                    <div className="mt-12 mt-md-16 btn btn-dark" onClick={loginUser}>
                                        Login
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}