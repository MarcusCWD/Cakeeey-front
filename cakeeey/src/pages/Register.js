import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { object, string, number, date, InferType } from 'yup';


export default function Register() {
    const [isPassword, setIsPassword] = useState(true)
    const [isFirstName, setIsFirstName] = useState(true)
    const [isLastName, setIsLastName] = useState(true)
    const [isEmailFormat, setIsEmailFormat] = useState(true)
    const [isAddress, setIsAddress] = useState(true)
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
        let flag = 1
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
        // let userSchema = object({
        //     name: string().required(),
        //     age: number().required().positive().integer(),
        //     email: string().email(),
        //     website: string().url().nullable(),
        //     createdOn: date().default(() => new Date()),
        //   });

        // const userYup = userSchema.validate(formState);


        if (flag == 1){
            await axios.post('https://cakeeey.onrender.com/api/user/register', formState);
            navigate("/login");
        }
    };


    // check if the user has already logged in
    useEffect(() => {
        if(localStorage.getItem("refreshToken")){
            navigate("/profile");
        }
      }, []);

    return (
        <section className="py-20" style={{minHeight:"800px"}} >
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
                className="form-control form-control-lg mt-4"
                type="text"
                name="firstname"
                value={formState.firstname}
                onChange={updateFormField}
                placeholder="first name"
            ></input>
            {isFirstName==false ? <div className="redColor">Please enter atleast 2 characters and up to 45 characters</div> : <div>{null}</div>} 
            <input
                className="form-control form-control-lg mt-4"
                type="text"
                name="lastname"
                value={formState.lastname}
                onChange={updateFormField}
                placeholder="last name"
            ></input>
            {isLastName==false ? <div className="redColor">Please enter atleast 2 characters and up to 45 characters</div> : <div>{null}</div>} 
            <input
                className="form-control form-control-lg mt-4"
                type="text"
                name="email"
                value={formState.email}
                onChange={updateFormField}
                placeholder="email"
            ></input>
            {isEmailFormat==false ? <div className="redColor">Please enter a valid email</div> : <div>{null}</div>} 
            <input
                className="form-control form-control-lg mt-4"
                type="text"
                name="address"
                value={formState.address}
                onChange={updateFormField}
                placeholder="address"
            ></input>
            {isAddress==false ? <div className="redColor">Please enter atleast 10 characters</div> : <div>{null}</div>} 
            <input
                className="form-control form-control-lg mt-4"
                type="text"
                name="password"
                value={formState.password}
                onChange={updateFormField}
                placeholder="password"
            ></input>
             {isPassword==false ? <div className="redColor">Please enter atleast 6 characters</div> : <div>{null}</div>} 
            <div className="my-5 mt-md-16 btn btn-dark" onClick={registerUser}>
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