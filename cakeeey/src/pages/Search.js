import React, { useEffect, useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import TokenContext from "./TokenContext";
import axios from "axios";

// this route is special because we are using both techic of props and hooks 
export default function Search(props) {

    const [fetchSearch, setFetchSearch] = useState([]);
    useEffect(() => {
      const getSearch = async () => {
        // console.log(props.search)
        const response = await axios.post(
          process.env.REACT_APP_CAKEEEY_EXPRESS_URL + "/api/products/search", {
          
              name: (props.search),
              season: (props.search),
          });
        setFetchSearch(response.data);
      };
      getSearch();
    }, [props.search]);
  

    return(
    <React.Fragment className=" d-flex justify-content-center">
      <div className="container">
      <div className="row g-2 p-5" style={{minHeight:"800px"}}>
              {fetchSearch &&
                fetchSearch.map((p) => (
                  <div className="col-12 col-sm-9 col-md-6 col-xl-3">
                    <Link
                      to={"/product/" + p.id}
                      href="#"
                      className="card p-0 mb-2 mx-auto mx-md-0 nostyle"
                    >
                      <div
                        className="image-search"
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

    </React.Fragment>
        

    )
}