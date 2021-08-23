import axios from "axios";
import React, { useState } from "react";
import { baseURL, headers } from "./../services/menu.service";
import {Redirect} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import "./../App.css";


export const PickUp = ({history}) => {
/*
  const initialState = {
    username: "",
    password: "",
    //Not Select: 0
    identity: "0",
    error_message: "",
  };

  const [user, setUser] = useState(initialState);
  const [error, setError] = useState("none");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const findUser = (data) => {
    let output = null;
    data.map((account, index) => {
        if (account.username == user.username && account.password == user.password && account.type_id == user.identity) {
            output = account;
        }
    })
    return output;
  };
  */
  const onSubmit = () => {
  /*
    if (user.username.length == 0 || user.password.length == 0) {
        setError("");
        setUser({...user, error_message: "Your username or password can't be empty."});
    } else if (user.identity == "0") {
        setError("");
        setUser({...user, error_message: "Please choose your identity."});
    } else {
        let data = {
          type_id: user.identity,
          username: user.username,
          password: user.password,
          phone_number: user.phone,
          address: user.address,
          payment_info: "N/A",
        };
        axios
          .get(`${baseURL}/BBUser/`, {
            headers: {
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            console.log(response.data);
            let output = findUser(response.data);
            if (output == null) {
                setError("");
                setUser({...user, error_message: "Your username/password/identity is incorrect, please try again."})
            } else {
                // store the user in localStorage
                localStorage.setItem("user", JSON.stringify(output))
                setError("none");
                history.push("/edit-info");
            }
          })
          .catch((e) => {
            console.log(e.message);
            setError("");
            setUser({...user, error_message: "Something went wrong, Please contact us with a screenshot (Network error)."});
            return;
          });
    }
    */
    history.push("/");
  }
 
  return (
    <div className="submit-form">
        <h5>
            Your order has been processed successfully! Pick up time will be around 6:30 pm
        </h5>
         <Form>
            <Form.Group >
                <Form.Label>Or choose your own pick time: </Form.Label>
                <Form.Control type="text" placeholder="For example: 6:45 pm" />
            </Form.Group>
            <Form.Group >
                <Form.Label>Car Description: </Form.Label>
                <Form.Control type="text" placeholder="For example: Black Porsche" />
            </Form.Group>
        </Form>
        <button onClick={onSubmit} className="btn btn-success">
            Go Back
        </button>
    </div>
  );
};
