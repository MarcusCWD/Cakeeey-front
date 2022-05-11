import React from "react";
import "./App.css";
import Main from "./pages/Main.js";
import Products from "./pages/Products.js";
import Product from "./pages/Product.js"

// import react router stuff
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <div className="ColorMain-bg FontMain text-center">
            From 01 May to 22 May, enjoy free delivery with a minimum of
            $100 spent
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
                  <Link className="p-1" to="/user">
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
          <Routes>
            {/* Main route */}
            <Route path="/" element={<Main />} />
            {/* <Route path="/user" element={<User />} /> */}
            <Route path="/products" element={<Products />} />
            <Route path="/product/:cake_id" element={<Product />} />
          </Routes>
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
