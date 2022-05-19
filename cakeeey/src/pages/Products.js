import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";

export default function Products() {
  const [allSeasons, setAllSeasons] = useState([]);
  const [allCakes, setAllCakes] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(
        "https://cakeeey.herokuapp.com/api/products/seasons"
      );
      setAllSeasons(response.data);
    };
    fetchPost();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(
        "https://cakeeey.herokuapp.com/api/products/cakes"
      );
      setAllCakes(response.data);
    };
    fetchPost();
  }, []);

  return (
    <React.Fragment>
      <div className="d-flex align-items-start container" style={{minHeight: '800px'}}>
        <div
          className="nav flex-column nav-pills me-3 col-3"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <button
            className="nav-link active"
            id="v-pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-home"
            type="button"
            role="tab"
            aria-controls="v-pills-home"
            aria-selected="true"
          >
            All
          </button>
          {allSeasons &&
            allSeasons.map((p) => (
              

              <button
                className="nav-link"
                id={`v-pills-${p.name}-tab`} 
                data-bs-toggle="pill"
                data-bs-target={`#v-pills-${p.name}`}
                type="button"
                role="tab"
                aria-controls={`v-pills-${p.name}`}
                aria-selected="false"
              >
                {p.name}
              </button>
         
             
            ))}
        </div>
        <div className="tab-content col-9" id="v-pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="v-pills-home"
            role="tabpanel"
            aria-labelledby="v-pills-home-tab"
          >
            <div className="row g-2 p-2">
              {allCakes &&
                allCakes.map((p) => (
                  <div className="col-md-4">
                    <Link
                      to={"/product/" + p.id}
                      href="#"
                      className="card p-0 mb-2 mx-auto mx-md-0 nostyle"
                    >
                      <div
                        className="image"
                        style={{ backgroundImage: `url(${p.image_url})` }}
                      ></div>
                      <div className="card-body">
                        <p className="card-title FontMain FontMain-color3 nostyle" style={{height:"45px"}}>
                          {p.name}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
          {allSeasons &&
            allSeasons.map((p) => (
              <div class="tab-pane fade" id={`v-pills-${p.name}`} role="tabpanel" aria-labelledby={`v-pills-${p.name}-tab`}>
                {console.log(p)}
              <div className="row g-2 p-2">
              {p.cakes &&
                p.cakes.map((cakes) => (
                  <div className="col-md-4">
                    <Link
                      to={"/product/" + cakes.id}
                      href="#"
                      className="card p-0 mb-2 mx-auto mx-md-0 nostyle"
                    >
                      <div
                        className="image"
                        style={{ backgroundImage: `url(${cakes.image_url})` }}
                      ></div>
                      <div className="card-body">
                        <p className="card-title FontMain FontMain-color3 nostyle" style={{height:"45px"}}>
                          {cakes.name}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
              </div>
            ))}
          
        </div>
      </div>
    </React.Fragment>
  );
}
