import axios from "axios";
import React, { useState, useEffect } from "react";
import { baseURL, headers } from "./../services/menu.service";
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import  Login from "./Login";
import "./../App.css";

export const Register = ({history}) => {
  const initialState = {
    username: "",
    password: "",
    re_password: "",
    //Not selected: 0
    identity: "0",
    //whether phone number and address inputs are displayed: "none" means hidden
    hidden: "none",
    phone: "foo",
    address: "foo",
    error_message :  "",
  };

  const [user, setUser] = useState(initialState);
  const [error, setError] = useState("none");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (user.hidden == "none" && name == "identity" && value == "Customer") {
        setUser({...user, [name]: value, hidden: ""});
    } else if (user.hidden != "none" && name == "identity" && value != "Customer") {
        setUser({...user, [name]: value, hidden: "none"});
    } else {
        setUser({ ...user, [name]: value });
    }
  };


  const onSubmit = () => {
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
    } else if (user.password != user.re_password) {
        setError("");
        setUser({...user, error_message: "Your passwords don't match. Please re-enter again."});
    } else if (user.identity == "0") {
        setError("");
        setUser({...user, error_message: "Please choose your identity."});
    } else if (user.identity == "Customer" && user.phone.length != 10) {
        setError("");
        setUser({...user, error_message: "Please re-enter your phone number, no hyphen included."});
    } else if (user.identity == "Customer" && user.address.length == 0){
        setError("");
        setUser({...user, error_message: "Your address can't be empty."});
    } else {
        let data = {
          type_id: user.identity,
          username: user.username,
          password: user.password,
          phone_number: user.phone,
          address: user.address,
          payment_info: "foo",
        };
        axios
          .post(`${baseURL}/BBUser/`, data, {
            headers: {
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            setError("none");
            // store the user in localStorage
            console.log(response.data)
            localStorage.setItem("user", JSON.stringify(response.data))
            setError("none");
            history.push("/edit-info");
          })
          .catch((e) => {
            console.log(e.message);
            setError("");
            if (e.message == "Network Error") {
                setUser({...user, error_message: "Something went wrong, Please contact us with a screenshot (Network error)."});
            } else {
                setUser({...user, error_message: "Your username has already been taken, please try another one."});
            }
            return;
          });

    }
  }
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
        history.push("/edit-info");
    }
   }, []);

  return (
    <div className="submit-form">
        <h5>Register a Account</h5>
        <Form>
            <Alert variant="danger" style={{display: error}}>
                {user.error_message}
            </Alert>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Case Sensitive" name = "username"  onChange = {handleChange} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Case Sensitive" name = "password" onChange = {handleChange} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Re-enter Password</Form.Label>
                <Form.Control type="password" placeholder="Case Sensitive" name = "re_password" onChange = {handleChange} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>I am a(n): </Form.Label>
                    <Form.Control as="select" name = "identity" onChange = {handleChange}>
                        <option value = "0">Please Select</option>
                        <option value = "Customer">Customer</option>
                        <option value = "Admin">Administrator</option>
                        <option value = "Staff">Resturant Staff</option>
                    </Form.Control>
            </Form.Group>
            <Form.Group style={{display: user.hidden}}>
                <Form.Label >Phone Number (Customer Only)</Form.Label>
                <Form.Control  placeholder="10 digit number" maxLength="10" name = "phone" onChange = {handleChange}/>
            </Form.Group>
            <Form.Group style={{display: user.hidden}}>
                <Form.Label >Address (Customer Only)</Form.Label>
                <Form.Control  placeholder="1234 Main St, City, State" name = "address" onChange = {handleChange}/>
            </Form.Group>
            <Form.Group>
                <a href="/login">back to login</a>
            </Form.Group>
        </Form>

        <button onClick={onSubmit} className="btn btn-success">
            Sign up
        </button>
    </div>
  );
};