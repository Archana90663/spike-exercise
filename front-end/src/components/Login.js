import axios from "axios";
import React, { useState, useEffect } from "react";
import { baseURL, headers } from "./../services/menu.service";
import {Redirect} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import "./../App.css";


export const Login = ({history}) => {
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

  const onSubmit = () => {
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
  }
    useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
        history.push("/edit-info");
    }
  }, []);
  return (
    <div className="submit-form">
        <h5>
            Login
        </h5>
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
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>I am a(n): </Form.Label>
                    <Form.Control as="select" name = "identity" onChange = {handleChange}>
                        <option value = "0">Please Select</option>
                        <option value = "Customer">Customer</option>
                        <option value = "Admin">Administrator</option>
                        <option value = "Staff">Resturant Staff</option>
                    </Form.Control>
            </Form.Group>
            <Form.Group>
                <a href="/register">Don't have an account? Register one here</a>
            </Form.Group>
        </Form>
        <button onClick={onSubmit} className="btn btn-success">
            Log in
        </button>
    </div>
  );
};

/*
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            identity: "0",
        };
    }

    render() {
        return (
            <div className="submit-form">
                <h5>
                    Login
                </h5>
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Case Sensitive" name = "username"  onChange = {this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Case Sensitive" name = "password" onChange = {this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>I am a(n): </Form.Label>
                            <Form.Control as="select" name = "identity" onChange = {this.handleChange}>
                                <option value = "0">Please Select</option>
                                <option value = "Customer">Customer</option>
                                <option value = "Admin">Administrator</option>
                                <option value = "Staff">Resturant Staff</option>
                            </Form.Control>
                    </Form.Group>
                </Form>
                <button onClick={this.test} className="btn btn-success">
                    Log in
                </button>
            </div>
        );
    }

    handleChange(e) {
        this.setState(this.state.username, e.target.value);
    }

    test() {
        console.log("success");
    }
}
export default Login;
*/