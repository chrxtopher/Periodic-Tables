import React, { useState } from "react";
import { listReservations } from "../utils/api";
import ReservationsList from "./ReservationsList";
import ErrorAlert from "../layout/ErrorAlert";

function SearchReservations() {
  const [reservations, setReservations] = useState([]);
  const [searchNumber, setSearchNumber] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setSearchNumber(Number(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      const data = await listReservations(
        { mobile_number: searchNumber },
        abortController.signal
      );
      setReservations(data);
    } catch (error) {
      setError(error);
    }

    return abortController.abort();
  };

  return (
    <div>
      <h1 className="text-center display-4 mt-3">Search for a Reservation</h1>
      <ErrorAlert error={error} />
      <form onSubmit={handleSubmit} className="my-5">
        <label className="m-2">Mobile Number</label>
        <div className="d-flex">
          <input
            name="mobile_number"
            onChange={handleChange}
            className="form-control shadow"
            type="text"
            placeholder="Enter a customer's phone number"
            required
          />
          <button
            type="submit"
            className="btn btn-primary border border-dark mx-2 shadow"
          >
            Search
          </button>
        </div>
      </form>
      <div className="d-flex flex-wrap justify-content-center">
        {reservations.length !== 0 && (
          <ReservationsList reservations={reservations} isSearching={true} />
        )}
        {reservations.length === 0 && (
          <h3 className="text-center">No reservations found</h3>
        )}
      </div>
    </div>
  );
}

export default SearchReservations;
