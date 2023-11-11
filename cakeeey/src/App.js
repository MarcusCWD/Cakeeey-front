import React from "react";
import "./App.css";
import Main from "./pages/Main.js";
import Products from "./pages/Products.js";
import Product from "./pages/Product.js"
import Login from "./pages/Login.js"
import Profile from "./pages/Profile.js"
import Cart from "./pages/Cart.js"
import Register from "./pages/Register.js"
import Search from "./pages/Search.js"
import PageNotFound from "./pages/PageNotFound.js"

// Imported Context
import UserToken from "./pages/UserToken.js";

// import react router stuff
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

class App extends React.Component {
  state = {
    clickFlag: false,
    searchBox: "",
  };

  searchDrop = () => {
    let previousclick = !(this.state.clickFlag)
    this.setState({
      clickFlag: previousclick
    });
  };

  updateFormField = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  
  render() {

    return (
      <React.Fragment>
        <Router>
          <div >
             <div className="ColorMain-bg FontMain text-center">
              From 1 to 27 December, enjoy our special winter seasonal cakes! 
            </div>


            <nav className="mainNav">
                {/* main logo is here */}
                <div className="logoPosition py-3 increaseHover2">
                  <Link to="/">
                    <img
                      src={require("./images/icon.png")}
                      height="110px"
                      width="110px"
                    ></img>
                  </Link>
                </div>

                {/* icons is here */}
                <div className="iconPosition">
                  <a href='#' onClick={this.searchDrop} className="p-1">
                    <img
                      src={require("./images/search.png")}
                      height="25px"
                      width="25px"
                      className="increaseHover2"
                    ></img>
                  </a>
                  <Link className="p-1" to="/cart" >
                    <img
                      src={require("./images/cart.png")}
                      height="25px"
                      width="25px"
                      className="increaseHover2"
                    ></img>
                  </Link>
                  <Link className="p-1" to="/profile">
                    <img
                      src={require("./images/user.png")}
                      height="25px"
                      width="25px"
                      className="increaseHover2"
                    ></img>
                  </Link>
                </div>
            </nav>
          </div>
         



          {this.state.clickFlag== 1 ? <div className="" style={{height:"100px"}}>
          <div className="position-relative container">
            <div className="position-relative mw-4xl mx-auto">
              <div className="position-absolute top-50 start-0 end-0 translate-middle-y ms-n6 me-n6" ></div>
                  <div className="position-relative py-16 pt-md-32 pb-md-20 px-4 px-sm-8 bg-white">
                    <div className="mw-lg mx-auto text-center">
                      {/* button search group */}
                      <div className="input-group">
                        <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon"  value= {this.state.searchBox} name="searchBox" onChange={this.updateFormField}/>
                        <Link to="/search "href="#">
                          <button type="button" className="btn BtnMain FontMain">search</button>
                        </Link>
                      </div>
                      {/* end button search group */}
                    </div>
                  </div>
              </div> 
          </div>
          </div> : null}
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
            <Route path="/search" element={<Search search={this.state.searchBox} />} />
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
          </UserToken>
        </Router>
        <div className="display-6 fs-6 ColorMainFooter-bg p-2">
          <p className=" d-flex justify-content-right p-2">
            <a href="https://twitter.com/">
              <img
                src={require("./images/twitter.png")}
                style={{ width: "25px" }}
                className="m-2"
                alt="twitter"
              />
            </a>
         
            <a href="https://www.facebook.com/">
              <img
                src={require("./images/facebook.png")}
                style={{ width: "25px" }}
                className="m-2"
                alt="facebook"
              />
            </a>
            
            <a href="https://www.instagram.com/">
              <img
                src={require("./images/instagram.png")}
                style={{ width: "25px" }}
                className="m-2"
                alt="instagram"
              />
            </a>

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
