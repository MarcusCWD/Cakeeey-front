import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "./TokenContext";
import axios from "axios";


export default function Profile() {
  let tokenContext = useContext(TokenContext);
  let navigate = useNavigate();
  let token = localStorage.getItem("accessToken");

  const logoutUser = async () => {
    tokenContext.logoutUser()
    navigate('/')
  }

  useEffect(() => {
    console.log("usertoken mounted");
    // if user has logout and there is no token in localstorege,
    //we have to redirect them to login page
    if (!token) {
      navigate("/login");
    }
    // first for this profile page render, we check if token is exprired
    tokenContext.updateUser().then(() => {
      tokenContext.retriveOrder();
    });
  }, []);

  return (
    <section className="container-fluid row" style={{height:"600px"}}>
      <div className="col-9">
          <div className="mt-2 FontMain" style={{ fontSize: "36px" }}>
        Your Order
      </div>
      {/* check if the order exist in the first place. if it does not, print out does not exist */}
      {!tokenContext.order ? (
        <div>Does not exist</div>
      ) : (
        <div>
          {tokenContext.order &&
            tokenContext.order.map((p) => (
              <div className="OrderBorder FontMain">
                <div
                  className="d-flex justify-content-between OrderListing"
                  style={{ fontSize: "24px", color: "#7c7c7c" }}
                >
                  <div className="m-2">Order Number: {p.id} </div>
                  {/* <div className="m-2">Status: {p.status.status} </div> */}
                  <div className="m-2">Date: {p.date.slice(0, 10)} </div>
                </div>
                {p.purchases &&
                  p.purchases.map((i) => (
                    <div className="row container-fluid">
                      <div
                        className="image-order col-3 my-2"
                        style={{
                          backgroundImage: `url(${i.product.cake.image_url})`,
                        }}
                      ></div>
                      <div className="col-5 my-2">
                        <div style={{ fontSize: "24px" }}>
                          {i.product.cake.name}
                        </div>
                        <div style={{ fontSize: "18px" }}>
                          Size: {i.product.cakesize.size}
                        </div>
                        <div style={{ fontSize: "18px" }}>
                          Quantity: {i.quantity}
                        </div>
                      </div>

                      <div className="col-4 my-2">
                        <div style={{ fontSize: "24px" }}>Price:</div>
                        <div style={{ color: "#7c7c7c", fontSize: "24px" }}>
                          $ {parseFloat(i.product.price / 100).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      )}
      </div>
      <div className="col-3 FontMain mt-2">
        <div className="d-inline-flex">
          <div style={{fontSize:"24px"}}>My Account </div>
          <button type="button" className="btn BtnMain FontMain mx-3" onClick={logoutUser}>Logout</button>
        </div>
      
      
      {tokenContext.order &&
            tokenContext.order.map((p) => (
              <div>
                <div style={{fontSize:"18px"}}>Name</div>
                <div>
                  {p.firstname} {p.lastname}
                </div>
                <div>{p.email}</div>
                <br></br>
                <div style={{fontSize:"18px"}}>Default address</div>
                <div>{p.address}</div>
              </div>
              

        ))}
      </div>
    
    </section>
  );
}
