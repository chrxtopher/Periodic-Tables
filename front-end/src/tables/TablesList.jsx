import React, { useState } from "react";
import { finishTable } from "../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

function TablesList({ table }) {
  const [error, setError] = useState(null);
  const history = useHistory();

  const status = table.reservation_id ? "occupied" : "free";

  const handleFinish = async () => {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      try {
        await finishTable(table.table_id);
        history.go();
      } catch (error) {
        setError(Error);
      }
    }
  };

  return (
    <div>
      <ErrorAlert error={error} />
      <div className="card bg-light border-dark m-4 shadow">
        <div className="card-body">
          <h4 className="card-title text-center">{table.table_name}</h4>
          <p className="card-text text-center">
            <strong>Capacity:</strong> {table.capacity}
          </p>
          <p className="text-center" data-table-id-status={`${table.table_id}`}>
            {status.toUpperCase()}
          </p>
          <div className="d-flex justify-content-center">
            {table.reservation_id && (
              <button
                onClick={handleFinish}
                data-table-id-finish={table.table_id}
                className="btn btn-primary border border-dark shadow"
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TablesList;
