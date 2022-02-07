import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const reservationsList = reservations.map((reservation) => {
    return (
      <div
        className="card bg-light border-dark m-1"
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
      </div>
    );
  });

  return (
    <main>
      <h1 className="display-4 text-center">Dashboard</h1>
      <div className="d-md-flex mb-3 text-center">
        <h4 className="mb-0">Reservations for date: {date}</h4>
      </div>
      <div className="text-center">
        <button className="btn btn-primary border border-dark m-1">Next</button>
        <button className="btn btn-primary border border-dark m-1">
          Previous
        </button>
        <button className="btn btn-warning border border-dark m-1">
          Today
        </button>
      </div>
      <ErrorAlert error={reservationsError} />
      <div>{reservationsList}</div>
    </main>
  );
}

export default Dashboard;
