export const MenuItem = (props) => {
    const id = props.id;
    const name = props.name;
    const price = props.price;
    const description = props.description;
    const updateItem = props.updateItem;
    const deleteItem = props.deleteItem;

    return (
        <div className="card my-3 w-25 mx-auto">
            <div className="card-body">
                <h2 className="card-title font-weight-bold">{name}</h2>
                <h4 className="card-subtitle mb-2">{price}</h4>
                <p className="card-text">{description}</p>
            </div>
            <div classNameName="card-footer">
                <div
                    className="btn-group justify-content-around w-75 mb-1 "
                    data-toggle="buttons"
                >
                <span>
                    <button
                      className="btn btn-info"
                      onClick={() => updateItem(id)}
                    >
                        Update
                    </button>
                </span>
                <span>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteItem(id)}
                    >
                        Delete
                    </button>
                </span>
                </div>
            </div>
        </div>
    );
};