import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

export default function Home() {
  const [allCakes, setAllCakes] = useState([]);

  useEffect(() => {
    // alert("sdfds")
    const fetchPost = async () => {
      const response = await axios.get(
        "https://cakeeey.herokuapp.com/api/products/cakes"
      );
      setAllCakes(response.data);
      // console.log(response.data)
    };
    fetchPost();
  }, []);

  return (
    <React.Fragment>
      {/* start carousel */}
      <div>
        <div
          id="carouselLanding"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="./images/carousel3.png"
                className="d-block w-100"
                alt="Black Sesame Hoji"
                height="500px"
                width="auto"
              />
            </div>
            <div className="carousel-item">
              <img
                src="./images/carousel2.png"
                className="d-block w-100"
                alt="Strawberry Cake"
                height="500px"
                width="auto"
              />
            </div>
            <div className="carousel-item">
              <img
                src="./images/carousel1.png"
                className="d-block w-100"
                alt="Birthday Cupcake"
                height="500px"
                width="auto"
              />
            </div>
          </div>
        </div>
        {/* start call to action */}
        <div className="CallToAction">
          <div
            className="FontMain-color1 FontMain"
            style={{ fontSize: "36px" }}
          >
            FOR YOUR SPECIAL OCCASIONS
          </div>
          <button type="button" className="btn BtnMain FontMain">
            SHOP NOW
          </button>
        </div>
        {/* end call to action */}
      </div>
      {/* end carousel */}

      {/* start selected products */}
      <section className="mt-5 mb-2 text-dark">
        <div className="display-4 p-3 mx-3 FontMain">Featured Products</div>
        <div className="scrolling-wrapper row flex-row flex-nowrap flex-lg-wrap m-4 pb-2 pt-2 gap-3 gap-lg-4">
          {allCakes &&
            allCakes.map((p) => (
              <div className="col-7 col-md-3 col-lg-2 shadow-sm p-3 mb-4 bg-body rounded">
                <div className="card-block">
                  <div
                    className="image"
                    style={{ backgroundImage: `url(${p.image_url})` }}
                  ></div>
                  <p
                    className="fs-6 fw-bold mt-2 FontMain"
                    style={{ lineHeight: "1.2" }}
                  >
                    {p.name}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </section>
      {/* end selected products */}
    </React.Fragment>
  );
}
