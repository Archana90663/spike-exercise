import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { baseURL, headers } from "./../services/menu.service";
import { useHistory } from "react-router-dom";
import { DangerMessage } from "./DangerMessage"
import { MenuItem } from "./MenuItem"

export const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);
  const history = useHistory();
  const countRef = useRef(0);

  const [showDeletedMessage, setShowDeletedMessage] = useState(false);

  useEffect(() => {
    retrieveAllMenuItems();
  }, [countRef]);

  const retrieveAllMenuItems = () => {
    axios
      .get(`${baseURL}/menuitems/`, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data); 
        setMenuItems(response.data);
        console.log(menuItems);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const deleteMenuItem = (id) => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        if (foundUser.type_id == "Customer") {
            alert("I am sorry, customer can't access this page.");
            history.push("/menus");
            return;
        }
    } else {
        alert("You haven't logged in yet. Please log in or register first.");
        history.push("/login");
        return;
    }
    axios
      .delete(`${baseURL}/menuitems/${id}/`, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        setShowDeletedMessage(true);
        retrieveAllMenuItems();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const updateMenuItem = (id) => {
    history.push(`/menu/${id}/update/`);
  };

  const closeDeletedMessage = () => {
    setShowDeletedMessage(false);
  };

  console.log(menuItems[0]);
  return (
    <div className="row justify-content-center">
      <div className="col">
        {showDeletedMessage && <DangerMessage close={closeDeletedMessage} />}
        {menuItems && 
          menuItems.map((menuItem) => (
            <MenuItem
              id={menuItem.id}
              name={menuItem.name}
              price={menuItem.price}
              description={menuItem.description}
              updateItem={updateMenuItem}
              deleteItem={deleteMenuItem}
            />
          ))}
      </div>
    </div>
  );
};