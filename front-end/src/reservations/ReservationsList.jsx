import React from "react";
import NoReservations from "./NoReservations";
import Reservation from "./Reservation";

function ReservationsList({ reservations }) {
  if (reservations.length <= 0) {
    return <NoReservations />;
  } else {
    return (
      <div className="d-flex flex-wrap">
        {reservations.map((reservation) => (
          <Reservation
            key={reservation.reservation_id}
            reservation={reservation}
          />
        ))}
      </div>
    );
  }
}

export default ReservationsList;
