import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Product() {

  let { cake_id } = useParams();
  const arrIngredient = [];

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const [sizeg, setSize] = useState(
    [{
      id: "",
      size: "",
    }]
  );

  const [sizeStore, setSizeStore] = useState(
    [{
      id: "",
      size: "",
    }]
  );

  const [description, setDescription] = useState("");
  const [ingredient, setIngredient] = useState([]);
  const [image, setImage] = useState("");

  const updateFormField = (e) => {
    setSizeStore({
      ...sizeg,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(
        "https://cakeeey.herokuapp.com/api/products/cakes/" + cake_id
      );


      //if name has been loaded
      
        let haveProduct = response.data[0].products;
        const arrSize = [];
        for (let i of haveProduct) {
          arrSize.push(i.cakesize);
        }
        setSize(arrSize);
        console.log(arrSize)
        let haveIngredient = response.data[0].ingredients;
        for (let i of haveIngredient) {
          if (!arrIngredient.includes(i.name)) {
            arrIngredient.push(i.name);
          }
        
        setIngredient(arrIngredient);
      }

      //if exist for price we just take the first
      if (response.data[0].products[0]) {
        setPrice(response.data[0].products[0].price);
      }

      setName(response.data[0].name);
      setDescription(response.data[0].description);
      setImage(response.data[0].image_url);
    };
    fetchPost();
  }, []);

  return (
    <React.Fragment>
      <div className="row container">
        {/* image */}
        <div className="col-7">
          <div
            className="image-individual"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        </div>

        {/* details of the item */}
        <div className="col-5 p-2">
          <div className="FontMain " style={{ fontSize: "32px" }}>
            {name}
          </div>
          <div className="FontMain" style={{ fontSize: "24px" }}>
            {parseFloat(price / 100).toFixed(2)}
          </div>
          <div>
            <label className="drop-down-label-width">Select Cake Size</label>
            <select
              value={sizeg.size}
              name="id"
              onChange={updateFormField}
              className="drop-down-width"
            >
              {sizeg && sizeg.map((p) => (
                <option value={p.id}>{p.size}</option>
              ))}
            </select>
          </div>
          <div style={{height:"40px"}}></div>
          {/* description */}
          <div>{description}</div>
          {/* ingredient */}
          <div style={{height:"100px"}}></div>
          <div>Ingredients: {ingredient && ingredient.map((p) => (
                <p className="d-inline">{p}, </p>
              ))}</div>
        </div>
      </div>
    </React.Fragment>
  );
}