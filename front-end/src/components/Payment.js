import axios from "axios";
import React, { useState, useEffect } from "react";
import { baseURL, headers } from "./../services/menu.service";
import {Redirect} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import "./../App.css";

export const Payment = ({history}) => {
  const initialState = {
    username: "",
    password: "",
    //Not Select: 0
    identity: "0",
    error_message: "",
    hidden: "none",
  };

  const [user, setUser] = useState(initialState);
  const [error, setError] = useState("none");
  const [pay, setPay] = useState(user.payment_info);
  
  const handleChange = (e) => {
    setPay(e.target.value);
    if (e.target.value == "Credit/Debit Card") {
        setUser({...user, hidden: ""});
    } else {
        setUser({...user, hidden: "none"});
    }
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      foundUser.payment_info = (foundUser.payment_info == "foo") ? "none" : foundUser.payment_info;
      foundUser.hidden = "none";
      setUser(foundUser);
    } else {
      alert("You haven't logged in yet. Please log in or register first.");
      history.push("/login");
    }
  }, []);

  const onSubmit = () => {
    if (pay == "Paypal") {
        alert("You will be redirecting to the Paypal payment page");
        window.open('https://www.paypal.com/us/signin');
    } else if (pay == "Stripe") {
        alert("You will be redirecting to the Stripe payment page");
        window.open('https://dashboard.stripe.com/login');
    } else if (pay == "ApplePay") {
        alert("You will be redirecting to the ApplePay payment page");
        window.open('https://www.apple.com/apple-pay/');
    } else if (pay != "Credit/Debit Card") {
        setError("");
        setUser({...user, error_message: "Please select your payment method"});
        return;
    } 
    let data = {
        type_id: user.type_id,
        username: user.username,
        password: user.password,
        phone_number: user.phone_number,
        address: user.address,
        payment_info: pay,
    };
    axios
        .put(`${baseURL}/BBUser/${user.id}/`, data, {
            headers: {
                "Content-type": "application/json",
            },
        })
        .then((response) => {
            // store the user in localStorage
            localStorage.setItem("user", JSON.stringify(response.data))
            setError("none");
            history.push("/");
        })
        .catch((e) => {
            console.log(e.message);
            setError("");
            setUser({...user, error_message: "Something went wrong, Please contact us with a screenshot (Payment error)."});
        return;
    });
  }

  return (
    <div className="submit-form">
        <h5>
            Payment
        </h5>
        <Form>
            <Alert variant="danger" style={{display: error}}>
                {user.error_message}
            </Alert>
            <Form.Group>
                <Form.Label>Choose your payment type (Your saved method is: {user.payment_info})</Form.Label>
                    <Form.Control as="select" name = "payment_info" onChange = {handleChange}>
                        <option value = "0">Please Select</option>
                        <option value = "Credit/Debit Card">Credit/Debit Card</option>
                        <option value = "Paypal">Paypal</option>
                        <option value = "Stripe">Stripe</option>
                        <option value = "ApplePay">ApplePay</option>
                    </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Row style={{display: user.hidden}}> 
                <Col>
                  <Form.Control placeholder="Card Number" />
                </Col>
                <Col>
                  <Form.Control placeholder="Cardholder Name" />
                </Col>
                <Col>
                  <Form.Control placeholder="CVS" />
                </Col>
              </Form.Row>
            </Form.Group>
        </Form>

        <button onClick={onSubmit} className="btn btn-success">
            Continue
        </button>
    </div>
  );
};
