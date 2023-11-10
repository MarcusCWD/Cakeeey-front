import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "./TokenContext";
import axios from "axios";


export default function Cart() {
    let tokenContext = useContext(TokenContext);
    let navigate = useNavigate();
    let token = localStorage.getItem("accessToken");
    const [cartItems, setCartItems] = useState([])
    const [priceTotal, setPriceTotal] = useState(0)


    useEffect(() => {
        console.log("usertoken mounted");
        // if user has logout and there is no token in localstorege,
        //we have to redirect them to login page
        if (!token) {
          navigate("/login");
        }
        else{
            tokenContext.updateUser()
            // we check if the user has loaded
            if(tokenContext.user.id){
              const internalFunction = async () => {
              let response = await axios.get(process.env.REACT_APP_CAKEEEY_EXPRESS_URL+"/api/cart/"+ tokenContext.user.id )
              setCartItems(response.data)
            }
            internalFunction()
            }
        }
      }, [tokenContext.user.id]);

      // whenever the state in cart item changes, we know that the user must have modified the qty
      useEffect(() => {
        let tempTotal = 0
        console.log(cartItems)
        for (let i of (cartItems)){
          console.log(i.product.price)
          tempTotal = tempTotal + i.product.price * i.quantity
        }
          console.log(tempTotal)
        setPriceTotal(tempTotal)
      }, [cartItems]);

      const incrementQty = async (e) => {
        const productIndex = (cartItems).findIndex(p => p.product_id === parseInt(e.target.name))
        let cloned = [...cartItems]
        cloned[productIndex].quantity += 1
        setCartItems(cloned)
        console.log(cloned[productIndex])
        await axios.post(process.env.REACT_APP_CAKEEEY_EXPRESS_URL + `/api/cart/` + tokenContext.user.id + `/` + e.target.name + `/` +cloned[productIndex].quantity +`/update`)
      } 
      const decrementQty = async (e) => {
        const productIndex = (cartItems).findIndex(p => p.product_id === parseInt(e.target.name))
        let cloned = [...cartItems]
        if (cloned[productIndex].quantity > 1) {
          cloned[productIndex].quantity -= 1;
        }
        setCartItems(cloned)
        console.log(cloned[productIndex])
        await axios.post(process.env.REACT_APP_CAKEEEY_EXPRESS_URL + `/api/cart/` + tokenContext.user.id + `/` + e.target.name + `/` +cloned[productIndex].quantity + `/update`)
      } 
      const deleteItem = async (e) => {
        await axios.post(process.env.REACT_APP_CAKEEEY_EXPRESS_URL + `/api/cart/` + tokenContext.user.id + `/` + e.target.name + `/delete`)
        const productIndex = cartItems.findIndex(p => p.product_id === parseInt(e.target.name))
        let cloned = [...cartItems]
        cloned.splice(productIndex, 1)
        setCartItems(cloned)
    }
    const redirectStripe = async () => {
      console.log(process.env.REACT_APP_CAKEEEY_EXPRESS_URL + `/api/checkout/` + tokenContext.user.id)
      let response = await axios.get(process.env.REACT_APP_CAKEEEY_EXPRESS_URL + `/api/checkout/` + tokenContext.user.id)
      window.location.replace(response.data.stripe.url);
      
   }

      return (
        
        <section className="container" style={{minHeight: '700px'}}>
            <div className="d-flex flex-sm-row flex-column  justify-content-between mx-2">
                <div className=" FontMain fs-1">Your Cart</div>
                
                <div className="fs-2">Sub Total: $ {parseFloat(priceTotal / 100).toFixed(2)}</div>
                {/* {cartItems.length < 1 ? <div></div> : <div><a  type="button" className="btn BtnMain FontMain" href={process.env.REACT_APP_CAKEEEY_EXPRESS_URL + `/api/checkout/` + tokenContext.user.id}>Checkout</a></div>}    */}
                {cartItems.length < 1 ? <div></div> : <div><a  type="button" className="btn BtnMain FontMain" onClick={redirectStripe}>Checkout</a></div>}
            </div>
            <hr/>
            {cartItems.length < 1 ? <div className="text-center mt-5 pt-5 fw-bold">Cart is empty</div> : null} 
            {cartItems &&
            cartItems.map((p) => (
            <div className="row mx-2">
            <div
                className="image-order col-3 my-2"
                style={{
                    backgroundImage: `url(${p.product.cake.image_url})`,
                }}
            ></div>
                <div className="col-4">
                  <div className="fs-6">{p.product.cake.name}</div>
                  <div  className="fs-6">Size: {p.product.cakesize.size}</div>
                  <div className=" mb-2 d-flex">
                    <div className="p-2"><button className="cart-update-qty btn btn-sm FontMain BtnMain" onClick={decrementQty} name={p.product_id} value={p.quantity}>-</button></div>
                    <div className="p-2">{p.quantity}</div>
                    <div className="p-2"><button className="cart-update-qty btn btn-sm FontMain BtnMain"  onClick={incrementQty} name={p.product_id} value={p.quantity}>+</button></div>
                  </div>
                </div>
                <div className="col-3">
                  <div>Individual Price: $</div>
                  <div> {parseFloat(p.product.price / 100).toFixed(2)}</div>
                </div>
                <div className="col-2">
                  <a className="mb-1" href="#">
                  <img
                    src={require("../images/close.png")}
                    style={{ width: "25px" }}
                    className="m-2 increaseHover"
                    alt="close button for item in cart"
                    onClick={deleteItem}
                    name={p.product_id}
                    />
                  </a>
                </div>
                <hr/>
            </div>
            
  
            ))}

        </section>
      )
}