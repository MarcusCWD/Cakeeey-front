import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import TokenContext from "./TokenContext";
export default function Profile() {
    let tokenContext = useContext(TokenContext);
    let navigate = useNavigate()
    useEffect(() => {
        tokenContext.updateUser();
        console.log(tokenContext.user)
        if(!(tokenContext.user)){
        navigate("/login")
    }
    }, []);

    return (
        <>
            <section className="container">
               HELLO
            </section>
        </>
    );
}