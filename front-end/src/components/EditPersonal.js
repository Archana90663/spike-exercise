import axios from "axios";
import React, { useState, useEffect } from "react";
import { baseURL, headers } from "./../services/menu.service";
import { withRouter } from 'react-router-dom'
import {Col, Row,Form} from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import  Login from "./Login";
import "./../App.css";

export const EditPersonal = ({history}) => {
  const initialState = {
    username: "",
    password: "",
    //Not selected: 0
    type_id: "",
    //whether phone number and address inputs are displayed: "none" means hidden
    hidden: "none",
    phone_number: "",
    address: "",
    error_message :  "",
  };

  const [user, setUser] = useState(initialState);
  const [error, setError] = useState("none");
  //edit mode
  const [edit, setEdit] = useState(false);
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      foundUser.hidden = (foundUser.type_id == "Customer") ? "" : "none";
      foundUser.payment_info = (foundUser.payment_info == "foo") ? "none" : foundUser.payment_info;
      setUser(foundUser);
    } else {
      alert("You haven't logged in yet. Please log in or register first.");
      history.push("/login");
    }
    console.log(user);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = () => {
    if (edit == true) {
        changeData();
    }
    setEdit(!edit);
  }

  const onCancel = () => {
    setEdit(!edit);
    window.location.reload(false);
  }
  const changeData = () => {
    if (user.identity == "Customer") {
        for (let c of user.phone) {
            if (c < '0' || c > '9') {
                setError("");
                setUser({...user, error_message: "Please recheck your phone number, should be all digits."});
                return;
            }
        }
    }

    if (user.username.length == 0 || user.password.length == 0) {
        setError("");
        setUser({...user, error_message: "Your username or password can't be empty."});
    } else if (user.identity == "0") {
        setError("");
        setUser({...user, error_message: "Please choose your identity."});
    } else if (user.identity == "Customer" && user.phone.length != 10) {
        setError("");
        setUser({...user, error_message: "Please re-enter your phone number, no hyphen included."});
    } else if (user.identity == "Customer" && user.address.length == 0){
        setError("");
        setUser({...user, error_message: "Your address can't be empty."});
    } else if (user.identity == "Customer" && user.payment_info.length == 0){
        setError("");
        setUser({...user, error_message: "Your Payment method can't be empty. Please enter 'none' if not decided"});
    } else {
        let data = {
          type_id: user.type_id,
          username: user.username,
          password: user.password,
          phone_number: user.phone_number,
          address: user.address,
          payment_info: user.payment_info,
        };
        console.log(data);
        axios
          .put(`${baseURL}/BBUser/${user.id}/`, data, {
            headers: {
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            console.log(response.data);
            // store the user in localStorage
            localStorage.setItem("user", JSON.stringify(response.data))
            setError("none");
          })
          .catch((e) => {
            console.log(e.message);
            setError("");
            setUser({...user, error_message: "New username has already been taken, please try another one."});
            return;
          });

        //history.push("/menu");
    }
  }

  return (
    <div className="submit-form">
        {!edit ? (
            <div>
            <h5>Your Personal Information</h5>
            <Form>
                <Alert variant="danger" style={{display: error}}>
                    {user.error_message}
                </Alert>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">Username: </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" plaintext readOnly defaultValue={user.username}  onChange = {handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">Password: </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" plaintext readOnly defaultValue={user.password}  onChange = {handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">Identity: </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" plaintext readOnly defaultValue={user.type_id}  onChange = {handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} style={{display: user.hidden}}>
                    <Form.Label column sm="2">Phone Number: </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" plaintext readOnly defaultValue={user.phone_number}  onChange = {handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} style={{display: user.hidden}}>
                    <Form.Label column sm="2">Address: </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" plaintext readOnly defaultValue={user.address}  onChange = {handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} style={{display: user.hidden}}>
                    <Form.Label column sm="2">Payment Method: </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" plaintext readOnly defaultValue={user.payment_info}  onChange = {handleChange} />
                    </Col>
                </Form.Group>
            </Form>

            <button onClick={onSubmit} className="btn btn-success">
                Edit
            </button>
            </div>
        ) : (
        <div>
        <h5>Edit Mode</h5>
        <Form>
            <Alert variant="danger" style={{display: error}}>
                {user.error_message}
            </Alert>
            <Form.Group as={Row}>
                <Form.Label column sm="2">Username: </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" defaultValue={user.username} name="username"  onChange = {handleChange} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="2">Password: </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" defaultValue={user.password}  onChange = {handleChange} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="2">Identity: </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" plaintext readOnly defaultValue={user.type_id}  onChange = {handleChange} />
                </Col>
            </Form.Group >
            <Form.Group as={Row} style={{display: user.hidden}}>
                <Form.Label column sm="2">Phone Number: </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" defaultValue={user.phone_number}  onChange = {handleChange} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}style={{display: user.hidden}}>
                <Form.Label column sm="2">Address: </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" defaultValue={user.address}  onChange = {handleChange} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}style={{display: user.hidden}}>
                <Form.Label column sm="2">Payment Type: </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" defaultValue={user.payment_info}  onChange = {handleChange} />
                </Col>
            </Form.Group>
        </Form>
        <button onClick={onCancel} style= {{margin:"5px"}} className="btn btn-success">
            Cancel
        </button>
        <button onClick={onSubmit} style= {{margin:"5px"}} className="btn btn-success">
            Save 
        </button>

        </div>
        )}
    </div>
  );
};