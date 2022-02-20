import React from "react";

function TablesList({ tables, reservations }) {
  const handleFinish = () => {
    if (window.confirm("test message")) {
      console.log("Finishing this seat!");
    }
  };

  return tables.map((table) => {
    const reservation = table.reservation_id
      ? reservations.find((reservation) => {
          return reservation.reservation_id === table.reservation_id;
        })
      : null;

    const status = reservation ? (
      <strong>
        Occupied by: {reservation.first_name} {reservation.last_name}
      </strong>
    ) : (
      "Free"
    );

    const finishButton = table.reservation_id ? (
      <button
        onClick={handleFinish}
        data-table-id-finish={table.table_id}
        className="btn btn-primary border border-dark shadow"
      >
        Finish
      </button>
    ) : null;

    return (
      <div
        key={table.table_id}
        className="card bg-light border-dark m-4 shadow"
      >
        <div className="card-body">
          <h4 className="card-title text-center">{table.table_name}</h4>
          <p className="card-text text-center">
            <strong>Capacity:</strong> {table.capacity}
          </p>
          <p className="text-center" data-table-id-status={`${table.table_id}`}>
            {status}
          </p>
          <div className="d-flex justify-content-center">{finishButton}</div>
        </div>
      </div>
    );
  });
}

export default TablesList;
