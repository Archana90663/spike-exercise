import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { baseURL, headers } from "./../services/menu.service";
import { useHistory } from "react-router-dom";
import { DangerMessage } from "./DangerMessage"
import { OrderDisplay} from "./OrderDisplay"

export const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const history = useHistory();
  const countRef = useRef(0);

  const [showDeletedMessage, setShowDeletedMessage] = useState(false);

  useEffect(() => {
    retrieveAllOrders();
  }, [countRef]);

  const retrieveAllOrders = () => {
    axios
      .get(`${baseURL}/orders/`, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data); 
        setOrders(response.data);
        console.log(orders);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const deleteOrder = (id) => {
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
      .delete(`${baseURL}/orders/${id}/`, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        setShowDeletedMessage(true);
        retrieveAllOrders();
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

  console.log(orders[0]);
  return (
    <div className="row justify-content-center">
      <div className="col">
        {showDeletedMessage && <DangerMessage close={closeDeletedMessage} />}
        {orders && 
          orders.map((order) => (
            <OrderDisplay
              order_num={order.order_num}
              pickup={order.pickup}
              car={order.car}
              bbuser={order.bbuser}
              updateItem={updateMenuItem}
              deleteItem={deleteOrder}
            />
          ))}
      </div>
    </div>
  );
};