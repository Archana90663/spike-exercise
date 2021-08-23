export const DangerMessage = (props) => {
    const close = props.close;

    return (
        <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
        >
            Delete successful!
            <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => close()}
            >
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
};