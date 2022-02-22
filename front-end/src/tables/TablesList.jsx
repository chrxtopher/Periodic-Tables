import React from "react";
import { finishTable } from "../utils/api";
import { useHistory } from "react-router-dom";

function TablesList({ tables, reservations }) {
  const history = useHistory();
  return tables.map((table) => {
    const reservation = table.reservation_id
      ? reservations.find((reservation) => {
          return reservation.reservation_id === table.reservation_id;
        })
      : null;

    const status = reservation ? "occupied" : "free";

    const handleFinish = async () => {
      if (
        window.confirm(
          "Is this table ready to seat new guests? This cannot be undone."
        )
      ) {
        await finishTable(table.table_id);
        history.go();
      }
    };

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
            {status.toUpperCase()}
          </p>
          <div className="d-flex justify-content-center">{finishButton}</div>
        </div>
      </div>
    );
  });
}

export default TablesList;
