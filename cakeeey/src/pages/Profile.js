import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import TokenContext from "./TokenContext";
import axios from "axios";
export default function Profile() {
    let tokenContext = useContext(TokenContext);
    let navigate = useNavigate()
    let token = localStorage.getItem("accessToken");
    // const [data, setData] = useState(null);

    // tokenContext.retriveOrder(id);
    
    useEffect(() => {
        console.log("usertoken mounted");
        // first for this profile page render, we check if token is exprired
        tokenContext.updateUser();
        // console.log(tokenContext.user)

        // if user has logout and there is no token in localstorege,
        //we have to redirect them to login page
        if(!token){
        navigate("/login")
        }
        tokenContext.retriveOrder();
    }, []);


    return (
        
            <section className="container">
                {/* <p>{JSON.stringify(userContext.user)}</p> */}
                {/* Welcome Message  */}
                {/* <div className="mt-8 FontMain">Welcome back, {tokenContext.user.email} </div> */}
                {/* <div className="FontMain" style={{fontSize: "24px"}}>Your Order</div> */}
                {console.log(tokenContext.order)}
                <div style={{borderColor: "grey"}}>
                    <div>Order Number: {tokenContext.order && (tokenContext.order).map((p) => (
                       <div>
                           {p && (p.purchases).map((i) => (
                            <div>{i.id}</div>
                            ))}
                       </div> 
              ))}</div>
                </div>
                <div>
                
                </div>

            </section>
    
    );
}