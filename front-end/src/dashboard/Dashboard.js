import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory, useLocation } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";
import ReservationsList from "../reservations/ReservationsList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const history = useHistory();
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [date, setDate] = useState(query.get("date") || today());

  useEffect(loadDashboard, [date]);
  useEffect(() => {
    history.push(`/dashboard?date=${date}`);
  }, [date, history]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const reservationsList = ReservationsList(reservations);

  return (
    <main>
      <h1 className="display-3 text-center">Dashboard</h1>
      <h4 className="text-center">Reservations for date: {date}</h4>

      <div className="text-center">
        <button
          className="btn btn-primary border border-dark m-1"
          onClick={() => setDate(previous(date))}
        >
          Previous
        </button>
        <button
          className="btn btn-warning border border-dark m-1"
          onClick={() => setDate(today())}
        >
          Today
        </button>
        <button
          className="btn btn-primary border border-dark m-1"
          onClick={() => setDate(next(date))}
        >
          Next
        </button>
      </div>
      <ErrorAlert error={reservationsError} />
      <div className="d-flex flex-wrap justify-content-center">
        {reservationsList}
      </div>
    </main>
  );
}

export default Dashboard;
