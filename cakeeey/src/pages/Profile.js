import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "./TokenContext";


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
      if(tokenContext.user.id){
        tokenContext.retriveOrder();
      }
      
    });
    
  }, [tokenContext.user.id]);
  console.log(tokenContext.user)
  return (
    <section className="container" style={{minHeight: '700px'}}>
      <div className="row d-flex flex-lg-row-reverse">
        <div className="col-12 col-lg-3 FontMain mt-2">
          <div className="d-inline-flex my-1">
            <div className="fs-2">My Account </div>
            <button
              type="button"
              className="btn BtnMain FontMain mx-3"
              onClick={logoutUser}
            >
              Logout
            </button>
          </div>

          {tokenContext.order &&
            tokenContext.order.slice(0, 1).map((p) => (
              <div>
                <div className="fs-4">Name</div>
                <div  className="fs-6">
                  {p.firstname} {p.lastname}
                </div>
                <div className="fs-6">{p.email}</div>
                <br/>
                <div className="fs-4">Default address</div>
                <div className="fs-6">{p.address}</div>
              </div>
            ))}
            <hr/>
        </div>
        <div className="col-12 col-lg-9 ">
          <div className="mt-2 FontMain fs-1 my-1">
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
                      className="d-flex flex-md-row flex-column justify-content-between OrderListing"
                      style={{  color: "#7c7c7c" }}
                    >
                      <div className="m-2 fs-6">Order Number: {p.id} </div>
                      <div className="m-2 fs-6">Status: {p.status.status} </div>
                      <div className="m-2 fs-6">Date: {p.date.slice(0, 10)} </div>
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
                            <div className="fs-6">
                              {i.product.cake.name}
                            </div>
                            <div className="fs-6">
                              Size: {i.product.cakesize.size}
                            </div>
                            <div className="fs-6">
                              Qty: {i.quantity}
                            </div>
                          </div>

                          <div className="col-4 my-2">
                            <div className="fs-6">Price:</div>
                            <div style={{ color: "#7c7c7c"}} className="fs-6">
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
      </div>
    </section>
  );
}
