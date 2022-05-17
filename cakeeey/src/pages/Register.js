import axios from "axios";
import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";


export default function Register(props) {
    const [isPassword, setIsPassword] = useState(true)
    const [isFirstName, setIsFirstName] = useState(true)
    const [isLastName, setIsLastName] = useState(true)
    const [isEmailFormat, setIsEmailFormat] = useState(true)
    const [isAddress, setIsAddress] = useState(true)
    let flag = 1
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        address: ""
    });

    const updateFormField = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    function validateEmail(email) {
        let regExpression = /\S+@\S+\.\S+/;
        return regExpression.test(email);
    }

    const registerUser = async () => {
        if(formState.firstname.length < 2 || formState.firstname.length > 45){
            flag = 0
            setIsFirstName(false)
        }
        if(formState.lastname.length < 2 || formState.lastname.length > 45){
            flag = 0
            setIsLastName(false)
        }
        if (validateEmail(formState.email) == false){
            flag = 0
            setIsEmailFormat(false)
        }
        if (formState.address.length < 10  ){
            flag = 0
            setIsAddress(false)
        }
        if (formState.password.length < 6 ){
            flag = 0
            setIsPassword(false)
        }

        if (flag == 1){
            await axios.post('https://cakeeey.herokuapp.com/api/user/register', formState);
            navigate("/login");
        }
    };


    // const [errorState, setErrorState] = useState({
    //     errorMessage: "",
    //     display: "d-none",
    // });

    return (
        <section className="py-20" style={{height:"600px"}} >
        <div style={{height:"50px"}}></div>
        <div className="position-relative container">
        <div className="position-relative mw-4xl mx-auto">
            <div className="position-absolute top-50 start-0 end-0 translate-middle-y ms-n6 me-n6" ></div>
            <div className="position-relative py-16 pt-md-32 pb-md-20 px-4 px-sm-8 bg-white">
                <div className="mw-lg mx-auto text-center">
                    <div className="d-inline-block h6 mb-14" href="#">
                       
                    </div>
                    <h2 className="mb-8">Register</h2>
                      <form>
            <input
                className="form-control form-control-lg mb-4"
                type="text"
                name="firstname"
                value={formState.firstname}
                onChange={updateFormField}
                placeholder="first name"
            ></input>
            {isFirstName==false ? <div>Please enter atleast 2 characters and up to 45 characters</div> : <div>{null}</div>} 
            <input
                className="form-control form-control-lg mb-4"
                type="text"
                name="lastname"
                value={formState.lastname}
                onChange={updateFormField}
                placeholder="last name"
            ></input>
            {isLastName==false ? <div>Please enter atleast 2 characters and up to 45 characters</div> : <div>{null}</div>} 
            <input
                className="form-control form-control-lg mb-4"
                type="text"
                name="email"
                value={formState.email}
                onChange={updateFormField}
                placeholder="email"
            ></input>
            {isEmailFormat==false ? <div>Please enter a valid email</div> : <div>{null}</div>} 
            <input
                className="form-control form-control-lg mb-4"
                type="text"
                name="address"
                value={formState.address}
                onChange={updateFormField}
                placeholder="address"
            ></input>
            {isAddress==false ? <div>Please enter atleast 10 characters</div> : <div>{null}</div>} 
            <input
                className="form-control form-control-lg mb-4"
                type="text"
                name="password"
                value={formState.password}
                onChange={updateFormField}
                placeholder="password"
            ></input>
             {isPassword==false ? <div>Please enter atleast 6 characters</div> : <div>{null}</div>} 
            <div className="mt-12 mt-md-16 btn btn-dark" onClick={registerUser}>
                Create Account
            </div>
            </form>
                </div>
            </div>
         </div>   
         </div>
         </section>

          

    );
}