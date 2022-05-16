import React from "react";
import "./App.css";
import Main from "./pages/Main.js";
import Products from "./pages/Products.js";
import Product from "./pages/Product.js"
import Login from "./pages/Login.js"
import Profile from "./pages/Profile.js"
import Cart from "./pages/Cart.js"
import Register from "./pages/Register.js"
// Imported Context
import UserToken from "./pages/UserToken.js";

// import react router stuff
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <div className="ColorMain-bg FontMain text-center">
            From 01 May to 22 May, enjoy our special seasonal cakes! 
          </div>
          <nav className="container">
            <div className="ColorWhite-bg">
              <div className="d-flex justify-content-between p-3">
                <div></div>
                <Link className="p-1" to="/">
                  <img
                    src="/images/icon.png"
                    height="100px"
                    width="100px"
                  ></img>
                </Link>
                <div>
                  <Link className="p-1" to="/cart">
                    <img
                      src="/images/cart.png"
                      height="25px"
                      width="25px"
                    ></img>
                  </Link>
                  <Link className="p-1" to="/profile">
                    <img
                      src="/images/user.png"
                      height="25px"
                      width="25px"
                    ></img>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          <UserToken>
             <Routes>
            {/* Main route */}
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:cake_id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          </UserToken>
        </Router>
        <div className="display-6 fs-6 ColorMainFooter-bg p-2">
          <p className=" d-flex justify-content-right p-2">
            <img
              src="./images/twitter.png"
              style={{ width: "25px" }}
              className="m-2"
              alt="instagram"
            />
            <img
              src="./images/facebook.png"
              style={{ width: "25px" }}
              className="m-2"
              alt="instagram"
            />
            <img
              src="./images/instagram.png"
              style={{ width: "25px" }}
              className="m-2"
              alt="instagram"
            />
          </p>
            <div >
              Our Location: 76 Bukit Timah Road #01-34 Singapore 198253 <br/> Tue-Fri 11.30AM-7PM, Sat 10AM-5PM, Sun 10AM-2PM <br/>Phone: +65 9982 1982
            </div>
            <br/>
            <div >© Cakeeey. 2022</div>
      
        </div>
      </React.Fragment>
    );
  }
}

export default App;
