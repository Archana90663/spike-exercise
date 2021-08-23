import axios from "axios";
import React, { useState, useEffect } from "react";
import { baseURL, headers } from "./../services/menu.service";
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import  Login from "./Login";

export const Order = ({history}) => {
  const initialState = {
    order_num: -1,
    pickup: "NA",
    car: "NA",
    bbuser: -1
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        const user_id = foundUser.id;
        setOrder({...order, bbuser: user_id});
    } else {
        alert("You haven't logged in yet. Please log in or register first.");
        history.push("/login");
    }
  }, []);

  const [order, setOrder] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };


  const onSubmit = () => {
    if (order.order_num <= 0 || order.order_num.length == 0) {
        alert("Order number has to be a positive integer!");
        return;
    } else {
        let data = {
          order_num: order.order_num,
          pickup: order.pickup,
          car: order.car,
          bbuser: order.bbuser,
        };
        axios
          .post(`${baseURL}/orders/`, data, {
            headers: {
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            // store the order in localStorage
            console.log(response.data);
            localStorage.setItem("order", JSON.stringify(response.data));
            history.push("/orderitems");
          })
          .catch((e) => {
            console.log(e.message);
            if (e.message == "Network Error") {
                setOrder({...order, error_message: "Something went wrong, Please contact us with a screenshot (Network error)."});
            } else {
                setOrder({...order, error_message: "Your order number is already taken; please try another number."});
            }
            return;
          });

    }
  }

  return (
    <div className="submit-form">
        <h5>Create an Order</h5>
        <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label> Order number</Form.Label>
                <Form.Control type="number" placeholder="Enter a number" name = "order_num"  onChange = {handleChange} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Pickup time</Form.Label>
                <Form.Control type="text" placeholder="Enter a pickup time" name = "pickup" onChange = {handleChange} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Car description</Form.Label>
                <Form.Control type="text" placeholder="Blue Honda Civic" name = "car" onChange = {handleChange} />
            </Form.Group>
            <Form.Group>
                <a href="/menus">Back to menu</a>
            </Form.Group>
        </Form>

        <button onClick={onSubmit} className="btn btn-success">
            Create order
        </button>
  </div> 
  );
};