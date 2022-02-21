import React from "react";
import { updateReservationStatus } from "../utils/api";
import { useHistory } from "react-router-dom";

function ReservationsList({
  reservations = [],
  noDisplayMessage,
  display = false,
}) {
  const history = useHistory();
  const abortController = new AbortController();

  if (display === true) {
    if (reservations.length === 0) {
      return <h4>{noDisplayMessage}</h4>;
    } else {
      return reservations.map((reservation) => {
        const handleSeatClick = async () => {
          await updateReservationStatus(
            reservation.reservation_id,
            "seated",
            abortController.signal
          );
          history.go();
        };

        return (
          <div key={reservation.reservation_id}>
            {reservation.status !== "finished" && (
              <div className="card bg-light border-dark m-4 shadow">
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
                      <a
                        href={`/reservations/${reservation.reservation_id}/seat`}
                      >
                        <button
                          onClick={handleSeatClick}
                          className="btn btn-success border border-dark shadow"
                        >
                          Seat
                        </button>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      });
    }
  } else {
    return null;
  }
}

export default ReservationsList;
