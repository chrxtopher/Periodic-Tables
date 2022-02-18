import React from "react";

function NoReservations() {
  return (
    <div className="card bg-light border-dark m-4 shadow">
      <div className="card-body">
        <h4 className="card-title text-center">No Reservations For This Date</h4>
        <p className="card-text text-center">Use the navigation side-bar to create a new reservation.</p>
      </div>
    </div>
  )
}

export default NoReservations;