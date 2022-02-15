import React from "react";

function ReservationsList(reservations = []) {
  return reservations.map((reservation) => {
    return (
      <div
        className="card bg-light border-dark m-1 shadow-sm"
        key={reservation.reservation_id}
      >
        <div className="card-body">
          <h4 className="card-title text-center">
            {reservation.first_name} {reservation.last_name} : Party of{" "}
            {reservation.people}
          </h4>
          <p className="card-text text-center">
            <strong>Contact:</strong> {reservation.mobile_number}
          </p>
          <p className="card-text text-center">
            <strong>Date:</strong> {reservation.reservation_date}
          </p>
          <p className="card-text text-center">
            <strong>Time:</strong> {reservation.reservation_time}
          </p>
        </div>
        <a
          className="btn btn-success border border-dark"
          href={`/reservations/${reservation.reservation_id}/seat`}
        >
          Seat
        </a>
      </div>
    );
  });
}

export default ReservationsList;