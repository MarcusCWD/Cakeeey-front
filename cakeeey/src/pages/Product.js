import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../App.css";
import { useParams } from "react-router-dom";
import TokenContext from "./TokenContext";

export default function Product() {
  let tokenContext = useContext(TokenContext);
  let { cake_id } = useParams();
  const arrIngredient = [];

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [dataStore, setDataStore] = useState([]);
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

  // when sizeg selection by user changes we have to change the price of our order too
  useEffect(()=>{
    if(dataStore[0] !== undefined){
      for(let i of dataStore[0].products){
      if(sizeStore.id == i.cakesize_id){
        setPrice(i.price)
      }
    }
    }
  }, [sizeStore])

  useEffect(() => {
    tokenContext.updateUser()
    const fetchPost = async () => {
      const response = await axios.get(
        "https://cakeeey.herokuapp.com/api/products/cakes/" + cake_id
      )
      setDataStore(response.data)

      //if name has been loaded
      
        let haveProduct = response.data[0].products;
        const arrSize = [];
        for (let i of haveProduct) {
          arrSize.push(i.cakesize);
        }
        setSize(arrSize);
        let haveIngredient = response.data[0].ingredients;
        for (let i of haveIngredient) {
          if (!arrIngredient.includes(i.name)) {
            arrIngredient.push(i.name);
          }
        setIngredient(arrIngredient);
      }

      // if exist for price we just take the first
      if (response.data[0].products[0]) {
        setPrice(response.data[0].products[0].price);
      }

      setName(response.data[0].name);
      setDescription(response.data[0].description);
      setImage(response.data[0].image_url);
    };
    fetchPost();
  }, []);

  
  const addCart = async () => {
     (dataStore[0].products).map((s) => {
      if(s.cakesize_id == sizeStore.id){
        let response = axios.post("https://cakeeey.herokuapp.com/api/cart/"+  tokenContext.user.id + `/` + s.id + `/add`);
        return response
      } 
    }
    )
  }

  const checkIfEmpty = () => {
    if(tokenContext.user.id){
      // we check if "Choice" aka user did not select any size of cake 
      if((sizeStore.id != "Choice") && ((sizeStore[0].id) != "")){
        return <div className="modal-body">Item Added to Cart</div>
      }
      else{
        return <div className="modal-body" style={{color:"red"}}>Please Select a Size</div>
      }
    }
    else{
      return (
        <div className="modal-body" style={{color:"red"}}>
          Please login first
        </div>
      )
    } 
  }

  return (
    <React.Fragment className=" d-flex justify-content-center">
      <div className="container">
        <div className="row">
        {/* image */}
        <div className="col-12 col-md-7">
          <div
            className="image-individual"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        </div>

        {/* details of the item */}
        <div className="col-12 col-md-5 p-2">
          <div className="FontMain display-5">
            {name}
          </div>
          <div className="FontMain display-6">
            ${parseFloat(price / 100).toFixed(2)}
          </div>
          <div>
            <label className="drop-down-label-width">Size:</label>
            <select
              value={sizeg.size}
              name="id"
              onChange={updateFormField}
              className="drop-down-width my-4"
            >
              <option>Choice</option>
              {sizeg && sizeg.map((p) => (
                <option value={p.id}>{p.size}</option>
              ))}
            </select>
          </div>
          <div style={{height:"60px"}}></div>
          {/* description */}
          <div>{description}</div>
          {/* ingredient */}
          <div style={{height:"70px"}}></div>
          <div>Ingredients: {ingredient && ingredient.map((p) => (
                <p className="d-inline">{p}, </p>
              ))}</div>
        {/* modal for cart  */}
        <div style={{height:"70px"}}></div>
        <div className="my-4">
        <button type="button" className="btn BtnMain FontMain" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={addCart}>
          Add to Cart
        </button>

        </div>


        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              
              {checkIfEmpty()}
              
            </div>
          </div>
        </div>
        </div>
        </div>
    
      </div>
    </React.Fragment>
  );
}
