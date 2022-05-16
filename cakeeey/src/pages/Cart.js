import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "./TokenContext";
import axios from "axios";


export default function Cart() {
    let tokenContext = useContext(TokenContext);
    let navigate = useNavigate();
    let token = localStorage.getItem("accessToken");
    const [cartItems, setCartItems] = useState([])


    useEffect(() => {
        console.log("usertoken mounted");
        // if user has logout and there is no token in localstorege,
        //we have to redirect them to login page
        if (!token) {
          navigate("/login");
        }

        else{
          const internalFunction = async () => {
            let response = await axios.get("https://cakeeey.herokuapp.com/api/cart/"+ tokenContext.user.id )
            setCartItems(response.data)
          }
          internalFunction()
        }
      }, []);

      
      const calculateTotal = ()=> {
        return null
      }

      const incrementQty = async (e) => {
        const productIndex = (cartItems).findIndex(p => p.product_id === parseInt(e.target.name))
        let cloned = [...cartItems]
        cloned[productIndex].quantity += 1
        setCartItems(cloned)
        console.log(cloned[productIndex])
        await axios.post(`https://cakeeey.herokuapp.com/api/cart/` + tokenContext.user.id + `/` + e.target.name + `/` +cloned[productIndex].quantity +`/update`)
      } 
      const decrementQty = async (e) => {
        const productIndex = (cartItems).findIndex(p => p.product_id === parseInt(e.target.name))
        let cloned = [...cartItems]
        if (cloned[productIndex].quantity > 1) {
          cloned[productIndex].quantity -= 1;
        }
        setCartItems(cloned)
        console.log(cloned[productIndex])
        await axios.post(`https://cakeeey.herokuapp.com/api/cart/` + tokenContext.user.id + `/` + e.target.name + `/` +cloned[productIndex].quantity + `/update`)
      } 
      const deleteItem = async (e) => {
        await axios.post(`https://cakeeey.herokuapp.com/api/cart/` + tokenContext.user.id + `/` + e.target.name + `/delete`)
        const productIndex = cartItems.findIndex(p => p.product_id === parseInt(e.target.name))
        let cloned = [...cartItems]
        cloned.splice(productIndex, 1)
        setCartItems(cloned)
    }

      return (
        <section className="container">
            <div className="row">
                <div className="col-2 FontMain" style={{fontSize:"32px"}}>Your Cart</div>
                <div className="col-4"></div>
                <div className="col-4">Sub Total: $ {calculateTotal}</div>
                <div className="col-2">
                  <a  type="button" className="btn BtnMain FontMain" href={`https://cakeeey.herokuapp.com/api/checkout/` + tokenContext.user.id}>Checkout</a>
                </div>   
            </div>
            {cartItems &&
            cartItems.map((p) => (
            <div className="row">
            <div
                className="image-order col-3 my-2"
                style={{
                    backgroundImage: `url(${p.product.cake.image_url})`,
                }}
            ></div>
                <div className="col-4">
                  <div style={{fontSize:"24px"}}>{p.product.cake.name}</div>
                  <div style={{fontSize:"18px"}}>Size: {p.product.cakesize.size}</div>
                  <div className=" mb-2 d-flex">
                    <div className="p-2"><button className="cart-update-qty btn btn-sm FontMain BtnMain" style={{fontSize:'18px'}} onClick={decrementQty} name={p.product_id} value={p.quantity}>-</button></div>
                    <div className="p-2">{p.quantity}</div>
                    <div className="p-2"><button className="cart-update-qty btn btn-sm FontMain BtnMain" style={{fontSize:'18px'}} onClick={incrementQty} name={p.product_id} value={p.quantity}>+</button></div>
                  </div>
                </div>
                <div className="col-3">
                  <div>Price:</div>
                  <div> {parseFloat(p.product.price / 100).toFixed(2)}</div>
                </div>
                <div className="col-2">
                  <a className="mb-1" href="#">
                  <img
                    src="./images/close.png"
                    style={{ width: "25px" }}
                    className="m-2 increaseHover"
                    alt="close button for item in cart"
                    onClick={deleteItem}
                    name={p.product_id}
                    />
                  </a>
                </div>
                <hr></hr>
            </div>
            
  
            ))}

        </section>
      )
}