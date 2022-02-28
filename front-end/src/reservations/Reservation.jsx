import React from "react";
import { cancelReservation, updateReservationStatus } from "../utils/api";
import { useHistory } from "react-router";

function Reservation({ reservation }) {
  const reservation_id = reservation.reservation_id;
  const abortController = new AbortController();
  const history = useHistory();

  const handleSeatClick = async () => {
    await updateReservationStatus(reservation, abortController.signal);
    history.go();
  };

  const handleCancelClick = async () => {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      await cancelReservation(
        reservation.reservation_id,
        abortController.signal
      );
      history.go();
    }
  };

  return (
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
            <a href={`/reservations/${reservation_id}/seat`}>
              <button
                type="submit"
                onClick={handleSeatClick}
                className="btn btn-success border border-dark shadow mx-2"
              >
                Seat
              </button>
            </a>

            <a href={`/reservations/${reservation_id}/edit`}>
              <button className="btn btn-warning border border-dark shadow mx-2">
                Edit
              </button>
            </a>
            <button
              onClick={handleCancelClick}
              data-reservation-id-cancel={reservation.reservation_id}
              className="btn btn-danger border border-dark shadow mx-2"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reservation;
