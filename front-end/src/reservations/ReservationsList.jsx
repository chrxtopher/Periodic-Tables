import React from "react";

function ReservationsList({
  reservations = [],
  noDisplayMessage,
  display = false,
}) {
  const handleSeatClick = async () => {
    ///
  };

  if (display === true) {
    if (reservations.length === 0) {
      return <h4>{noDisplayMessage}</h4>;
    } else {
      return reservations.map((reservation) => {
        return (
          <div
            className="card bg-light border-dark m-4 shadow"
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
              <p
                data-reservation-id-status={reservation.reservation_id}
                className="card-text text-center"
              >
                <strong>Status: </strong> {reservation.status.toUpperCase()}
              </p>
              {reservation.status === "booked" && (
                <div className="d-flex justify-content-center">
                  <a href={`/reservations/${reservation.reservation_id}/seat`}>
                    <button
                      onClick={handleSeatClick}
                      className="btn-lg btn-success border border-dark"
                    >
                      Seat
                    </button>
                  </a>
                </div>
              )}
            </div>
          </div>
        );
      });
    }
  } else {
    return null;
  }
}

export default ReservationsList;
