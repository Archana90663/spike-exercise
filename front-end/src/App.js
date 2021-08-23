import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from 'react-bootstrap/Dropdown';

import { Switch, Route, Link } from "react-router-dom";

import { AddMenu } from "./components/AddMenu";
import { MenuList } from "./components/MenuList";
import { UpdateMenu } from "./components/UpdateMenu";
import { Order } from "./components/Order";
import { OrderItems } from "./components/OrderItems";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { Register} from "./components/Register";
import { EditPersonal } from "./components/EditPersonal";
import { OrderList } from "./components/OrderList";
import { Payment } from "./components/Payment";
import { NotFound } from "./components/NotFound";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-info">
        <a href="/" className="navbar-brand">
          Spike Exercise
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Dropdown >
              <Dropdown.Toggle variant="info" id="dropdown-basic">
                Account
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href={"/login/"}>Login</Dropdown.Item>
                <Dropdown.Item href={"/register/"}>Register</Dropdown.Item>
                <Dropdown.Item href={"/logout/"}>Logout</Dropdown.Item>
                <Dropdown.Item href="/edit-info">Edit Account Information</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li className="nav-item">
            <Dropdown>
              <Dropdown.Toggle variant="info" id="dropdown-basic">
                Menu
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href={"/menus/"}>View menu</Dropdown.Item>
                <Dropdown.Item href={"/order/"}>Make an order</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </div>
      </nav>

      <div className="container m-10">
        <Switch>
          <Route exact path={["/", "/menus"]} component={MenuList} />
          <Route exact path="/add/" component={AddMenu} />
          <Route path="/menu/:id/update/" component={UpdateMenu} />
          <Route exact path="/order/" component={Order} />
          <Route exact path="/orderitems/" component={OrderItems} />
          <Route exact path="/login/" component={Login} />
          <Route exact path="/register/" component={Register} />
          <Route exact path="/edit-info/" component={EditPersonal} />
          <Route exact path="/logout/" component={Logout} />
          <Route exact path="/orders/" component={OrderList} />
          <Route exact path="/payment/" component={Payment} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
        /*
          <li className="nav-item">
            <Link exact to={"/add/"} className="nav-link">
              Login
            </Link>
          </li>
          */