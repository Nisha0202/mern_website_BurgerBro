import React, { useRef, useEffect, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
import { Card, Button } from "react-bootstrap";
const MAX_LENGTH = 100;
export default function Cards(props) {

const priceRef = useRef()  ;
  let dispatch = useDispatchCart();
  let option = props.options || {};
  let priceOptions = Object.keys(option || {});
  let description = props.foodItem.description || ""; // Extract the description or use an empty string if it's undefined
let data = useCart();

  if (description.length > MAX_LENGTH) {
    description = description.substring(0, MAX_LENGTH) + "..."; // Truncate the description and append "..."
  }

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    let food = null;
    //update
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food !== null) {
      //size change will add differently
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, quantity: quantity });
        return;
      } else {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, quantity: quantity, size: size, price: finalPrice });
      
      }
      
    } else {
      await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, quantity: quantity, size: size, price: finalPrice });
    }
  }
  




  let finalPrice = quantity * parseInt(option[size]);

  useEffect(() =>{
    setSize(priceRef.current.value)
  },[])


  return (
    <div className="container-fluid">
      <div className=" card-wrapper" >
        <Card className=" border-1 mb-3">
          <Card.Img className="card-image" variant="top" src={props.foodItem.img} />
          <Card.Body className="custom-card-body">
            <Card.Title>{props.foodItem.name && props.foodItem.name}</Card.Title>
            <Card.Text className='desc-container'>{description}</Card.Text>
            <div className="d-flex justify-content-between custom-container">
              <div>
                <select className="option rounded mr-2" onChange={(e) => setQuantity(e.target.value)}>
                  {Array.from(Array(6), (e, i) => {
                    return (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <select className="option rounded mr-3 " ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                  {priceOptions.slice(1).map((data) => {
                    return <option key={data} value={data}>{data}</option>;
                  })}
                </select>
              </div>
              <div className="fs-6">
                {finalPrice}tk/-
              </div>

            </div>
            <hr></hr>
            <Button variant="primary" onClick={handleAddToCart}>+ Add to Cart</Button>
          </Card.Body>
        </Card>

      </div>
    </div>

  )
}
