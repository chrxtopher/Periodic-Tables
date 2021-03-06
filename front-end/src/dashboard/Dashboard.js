import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory, useLocation } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";
import ReservationsList from "../reservations/ReservationsList";
import TablesList from "../tables/TablesList";

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
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null);
  const [date, setDate] = useState(query.get("date") || today());

  useEffect(loadDashboard, [date]);
  useEffect(loadTables, []);

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

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);

    return () => abortController.abort();
  }

  return (
    <main>
      <h1 className="display-4 text-center mt-3 mb-5">Dashboard</h1>
      <h3 className="text-center">Reservations for date:</h3>
      <h3 className="text-center">{date}</h3>
      <div className="d-flex justify-content-center my-4">
        <button
          className="btn-lg btn-primary border border-dark mx-2 shadow"
          onClick={() => setDate(previous(date))}
        >
          Previous
        </button>
        <button
          className="btn-lg btn-warning border border-dark mx-2 shadow"
          onClick={() => setDate(today())}
        >
          Today
        </button>
        <button
          className="btn-lg btn-primary border border-dark mx-2 shadow"
          onClick={() => setDate(next(date))}
        >
          Next
        </button>
      </div>
      <ErrorAlert error={reservationsError} />
      <section className="d-flex flex-wrap justify-content-center">
        <ReservationsList reservations={reservations} />
      </section>
      <ErrorAlert error={tablesError} />
      <h3 className="text-center my-4">Tables</h3>
      <section className="d-flex flex-wrap justify-content-center">
        {tables &&
          tables.map((table) => {
            return <TablesList key={table.table_id} table={table} />;
          })}
      </section>
    </main>
  );
}

export default Dashboard;
