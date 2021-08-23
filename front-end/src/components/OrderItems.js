import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { baseURL, headers } from "./../services/menu.service";
import { MenuItemOrder } from "./MenuItemOrder"

export const OrderItems = ({ history }) => {
  const [menuItems, setMenuItems] = useState([]);
  const countRef = useRef(0);

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

  const addItemToOrder = (id) => {
    const currentOrder = localStorage.getItem("order");
    if (currentOrder) {
        const parsedOrder = JSON.parse(currentOrder);
        let data = {
            order_id: parsedOrder.order_num,
            menu_items_id: id,
            quantity: 1,
          };
        axios
          .post(`${baseURL}/orderitems/`, data, {
            headers: {
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            alert("Order successfully updated!");
            retrieveAllMenuItems();
          })
          .catch((e) => {
            console.error(e);
          });
    } else {
        alert("Sorry, an error on our part occured. Please try again.");
        return;
    }
  };

  return (
    <div>
    <div className="row justify-content-center">
      <div className="col">
        {menuItems && 
          menuItems.map((menuItem) => (
            <MenuItemOrder
              id={menuItem.id}
              name={menuItem.name}
              price={menuItem.price}
              description={menuItem.description}
              addItemToOrder={addItemToOrder}
            />
          ))}
      </div>
    </div>
    <div className="row justify-content-center">
      <button onClick={() => {history.push("/payment")}} className="btn btn-success" style={{margin: "auto"}}>
            Checkout
      </button>
    </div>
    </div>
  );
};