import React from "react";

function TablesList({ tables, reservations }) {

  return tables.map((table) => {
    const reservation = reservations.find((reservation) => {
      return reservation.reservation_id === table.reservation_id
    })

    const status = reservation ? `Occupied by: ${reservation.first_name} ${reservation.last_name}` : "Free"

    return (
      <>
        <div className="card bg-light border-dark m-4 shadow">
          <div className="card-body">
            <h4 className="card-title text-center">{table.table_name}</h4>
            <p className="card-text text-center">
            <strong>Capacity:</strong> {table.capacity}
            </p>
            <p className="text-center" data-table-id-status={`${table.table_id}`}>{status}</p>
          </div>
        </div>
      </>
    )
  })
}

export default TablesList;