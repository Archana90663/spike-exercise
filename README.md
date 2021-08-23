# spike-exercise
# Setup Requirement: 
python, pip, nodejs, npm, yarn, django, django-rest-framework, django-cors-headers, axios, bootstrap, react-bootstrap, react-router-dom

# Setup Procedure:
Install python, pip, nodejs, npm, yarn

Install axios and React dependencies: <code>yarn add axios bootstrap react-bootstrap react-router-dom</code>

Install and create a virtual environment: https://docs.python.org/3/tutorial/venv.html

Install django and dependencies **(inside virtual environment)**: <code>pip install django django-rest-framework django-cors-headers</code>


# Running Commands:
backend **(inside virtual environment)**: <code>python manage.py runserver</code> and go to http://localhost:8000/api/{model_name}/

frontend: first <code> npm install </code>, then <code>yarn start</code>, go to http://localhost:3000/

# User Managements:
* Register
    * Interactions
      * Input fields, handled by handleChange()
      * Phone number and Address shown only if the "Customer" identity is selected
      * Once buttom pressed and conditions are met, POST to backend and redirect to user-info page
      * Error message will be shown if something is inappropiate
      * Special error message will display for unknown errors
    * Restrictions
      * Username, Password can't be empty
      * Password and Re-enter password must be the same
      * Identity selection is required
      * Phone number must be 10 characters, all digits  
      * Address can't be empty
      * Payment Method is "N/A" at default
      * Log-in user can't access this page

 * Login
    * Interactions
      * Input fields, handled by handleChange()
      * Once buttom pressed and conditions are met, GET from backend, find the corresponding user, save to the localStorage and redirect to user-info page
      * Error message will be shown if conditions are not met or no corresponding user found
      * Special error message will display for unknown errors
    * Restrictions
      * Username, Password can't be empty
      * Identity selection is required
      * Log-in user can't access this page
  
 * Logout: clear localStorage
 
 * Personal Information: read data from localStorage previously stored in register/login page
   * Enable edit mode
   * Require login first 
 
 # Menu and Order Managements:
 * Menu page
   * Customers can view the menu only
   *  Resturatant Staff and Admin can edit and delete menu items

 * Order page
   * All users can create a new order
   * After creating an order, users can add menu items to their order
   * Users can checkout and go to the payment page

 * Payment page
   * Previously saved payment method will display at the top 
   * 4 choices: Credit/Debit card, Paypal, Stripe and ApplePay
   * Choosing Paypal, Stripe and ApplePay will trigger alert and open a seperate page 

 * Pickup page
   * Approximate pickup time is shown, user can edit them. 
   * Customers are able to edit their car description.
 
  # Others:
 * Error Page (404 Not Found)
 * Delete message 


