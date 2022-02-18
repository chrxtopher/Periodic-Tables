import React, { useState } from "react";
import { listReservations } from "../utils/api";
import ReservationsList from "./ReservationsList";
import ErrorAlert from "../layout/ErrorAlert";

function SearchReservations() {
  const [reservations, setReservations] = useState([]);
  const [searchNumber, setSearchNumber] = useState("");
  const [display, setDisplay] = useState(false);
  const [error, setError] = useState(null);
  const noDisplayMessage = "No reservations found";

  const handleChange = (event) => {
    setSearchNumber(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setSearchNumber(searchNumber.replace(/\D/g, ""))
    try {
      const data = await listReservations({ mobile_number: searchNumber }, abortController.signal);
      setReservations(data);
    } catch (error) {
      setError(error);
    }
    setDisplay(true);
  }

  return (
    <div>
      <h1 className="text-center display-4 mt-3">Search for a Reservation</h1>
      <ErrorAlert error={error}/>
        <form onSubmit={handleSubmit} className="m-5">
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
            <button className="btn btn-primary border border-dark mx-2 shadow">Search</button>
          </div>
        </form>
        <div className="d-flex flex-wrap justify-content-center">
          <ReservationsList 
            reservations={reservations} 
            noDisplayMessage={noDisplayMessage} 
            display={display}
          />
        </div>
        
    </div>
  )
}

export default SearchReservations;