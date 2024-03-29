import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";

export default function Main() {
  const [allCakes, setAllCakes] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(
        process.env.REACT_APP_CAKEEEY_EXPRESS_URL + "/api/products/cakes"
      );
      setAllCakes(response.data);
    };
    fetchPost();
  }, []);

  return (
    <React.Fragment>
      {/* start carousel */}
      <div className="postion-relative">
        <div
          id="carouselLanding"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://res.cloudinary.com/dfyhd6bpb/image/upload/v1699337210/nxdpqfvw22clp5k0gdcp.png"
                className="d-block w-100"
                alt="Black Sesame Hoji"
                height="500px"
                width="auto"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://res.cloudinary.com/dfyhd6bpb/image/upload/v1699337609/bip8ownsvjfolcoyslgu.png"
                className="d-block w-100"
                alt="Strawberry Cake"
                height="500px"
                width="auto"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://res.cloudinary.com/dfyhd6bpb/image/upload/v1699337615/jtnq3d15ldlbsxdrpvrg.png"
                className="d-block w-100"
                alt="Birthday Cupcake"
                height="500px"
                width="auto"
              />
            </div>
          </div>
        </div>
        {/* start call to action */}
        <div className="position-absolute top-50 start-50 translate-middle">
          <div
            className="FontMain-color1 FontMain text-center fs-1"   
          >
            FOR YOUR SPECIAL OCCASIONS
          </div>
          <div className="justify-content-center d-flex">
          <Link
            to={"/products"}
            href="#"
          >
            <a type="button" className="btn btn-lg BtnMain FontMain">
              SHOP NOW
            </a>
          </Link>
          </div>
 
        </div>
        {/* end call to action */}
      </div>
      {/* end carousel */}

      {/* start selected products */}
      <section className="mt-5 mb-2 text-dark">
        <div className="fs-2 p-3 mx-3 FontMain fw-bold">Featured Products</div>
        <div className="scrolling-wrapper row flex-row flex-nowrap flex-lg-wrap m-4 pb-2 pt-2 gap-3 gap-lg-4">
          {allCakes &&
            (allCakes.slice(0,5)).map((p) => ( // we limit the cards to show 8 featured items
              <div className="col-7 col-md-3 col-lg-2 shadow-sm p-3 mb-4 bg-body rounded increaseHover2">
                <Link
                  to={"/product/" + p.id}
                  href="#"
                  className=" nostyle"
                >
                  <div className="card-block">
                    <div
                      className="image"
                      style={{ backgroundImage: `url(${p.image_url})` }}
                    ></div>
                    <p
                      className="fs-6 mt-2 FontMain"
                      style={{ lineHeight: "1.2" }}
                    >
                      {p.name}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </section>
      {/* end selected products */}
    </React.Fragment>
  );
}
