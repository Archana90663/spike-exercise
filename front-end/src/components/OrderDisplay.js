export const OrderDisplay = (props) => {
  const {order_num, pickup, car, bbuser, updateItem, deleteItem} = props;

  return (
      <div className="card my-3 w-25 mx-auto">
          <div className="card-body">
              <h2 className="card-title font-weight-bold">{order_num}</h2>
              <h4 className="card-subtitle mb-2">{pickup}</h4>
              <p className="card-text">{car}</p>
              <p className="card-text">{bbuser}</p>
          </div>
          <div classNameName="card-footer">
              <div
                  className="btn-group justify-content-around w-75 mb-1 "
                  data-toggle="buttons"
              >
              <span>
                  <button
                    className="btn btn-info"
                    onClick={() => updateItem(order_num)}
                  >
                      Update
                  </button>
              </span>
              <span>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteItem(order_num)}
                  >
                      Delete
                  </button>
              </span>
              </div>
          </div>
      </div>
  );
};