import axios from "axios";
import React, { useState, useEffect } from "react";
import { baseURL, headers } from "./../services/menu.service";

export const AddMenu = ({ history }) => {
  const initialMenuItemState = {
    id: 0,
    name: "",
    description: "",
    price: 0,
    availability: false,
  };

  const [menuItem, setMenuItem] = useState(initialMenuItemState);
  const [submitted, setSubmitted] = useState(false);

  const handleMenuChange = (e) => {
    const { name, value } = e.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  const submitMenu = () => {
    const data = {
      id: menuItem.id,
      name: menuItem.name,
      description: menuItem.description,
      price: menuItem.price,
      availability: menuItem.availability,
    };
    console.log(data);
    axios
      .post(`${baseURL}/menuitems/`, data, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        setMenuItem({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
          availability: response.data.availability,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const newMenu = () => {
    setMenuItem(initialMenuItemState);
    setSubmitted(false);
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        if (foundUser.type_id == "Customer") {
            alert("I am sorry, customer can't access this page.");
            history.push("/menus");
        }
    } else {
        alert("You haven't logged in yet. Please log in or register first.");
        history.push("/login");
    }
    
  }, []);

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            Menu Added!
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <button className="btn btn-success" onClick={newMenu}>
            Add
          </button>
        </div>
      ) : (
        <div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={menuItem.name}
              onChange={handleMenuChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={menuItem.description}
              onChange={handleMenuChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              required
              value={menuItem.price}
              onChange={handleMenuChange}
              name="price"
            />
          </div>

          <div className="form-group">
            <label htmlFor="availability">Availability</label>
            <input
              type="boolean"
              className="form-control"
              id="availability"
              required
              value={menuItem.availability}
              onChange={handleMenuChange}
              name="availability"
            />
          </div>

          <button onClick={submitMenu} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};