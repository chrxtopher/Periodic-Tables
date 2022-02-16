import React from "react";

function TablesList({ tables }) {
  return tables.map((table) => {
    return (
      <>
        <div className="card bg-light border-dark m-4 shadow">
          <div className="card-body">
            <h4 className="card-title text-center">{table.table_name}</h4>
            <p className="card-text text-center">
            <strong>Capacity:</strong> {table.capacity}
          </p>
          </div>
        </div>
      </>
    )
  })
}

export default TablesList;