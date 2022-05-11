import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Product() {
  let { cake_id } = useParams();
  const arrSize = [];
  const arrIngredient = [];

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState([]);
  const [description, setDescription] = useState("");
  const [ingredient, setIngredient] = useState([]);
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(
        "https://cakeeey.herokuapp.com/api/products/cakes/" + cake_id
      );

      //get back array of possible cake sizes for the particular cake
      let haveProduct = response.data[0].products;
      for (let i of haveProduct) {
        if (!arrSize.includes(i.cakesize.size)) {
          arrSize.push(i.cakesize.size);
        }
      }
      setSize(arrSize);

      let haveIngredient = response.data[0].ingredients;
      for (let i of haveIngredient) {
        if (!arrIngredient.includes(i.name)) {
          arrIngredient.push(i.name);
        }
      }
      setSize(arrIngredient);

      //if exist for price we just take the first
      if (response.data[0].products[0]) {
        setPrice(response.data[0].products[0].price);
      }

      setName(response.data[0].name);
      setDescription(response.data[0].description);
      setImage(response.data[0].image_url);
    };
    fetchPost();
  }, [cake_id]);

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
        <div className="col-5">
            <div className="FontMain" style={{fontSize:"32px"}}>{name}</div>
            <div className="FontMain" style={{fontSize:"24px"}}>
            {parseFloat(price/100).toFixed(2)}
            </div>
        </div>
      </div>
    </React.Fragment>
  );
}
