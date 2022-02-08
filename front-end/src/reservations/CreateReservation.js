import React, { useState } from "react";

/*
first name
last name 
mobile number
date of reservation
time of reservation
people in party, at least 1
*/

function ReservationForm() {
  const [newReservation, setNewReservation] = useState({});

  ////////////////////
  // HANDLERS BELOW //
  /////////////////////

  const handleFirstNameChange = (event) => {
    setNewReservation({ ...newReservation, first_name: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <form className="m-5">
      <div>
        <div className="col mb-3">
          <label className="ml-2 mb-1" htmlFor="firstName">
            First Name
          </label>
          <input
            onChange={handleFirstNameChange}
            className="form-control"
            type="text"
            placeholder="First Name"
          />
        </div>
        <div className="col mb-3">
          <label className="ml-2 mb-1" htmlFor="lastName">
            Last Name
          </label>
          <input className="form-control" type="text" placeholder="Last Name" />
        </div>
        <div className="col mb-3">
          <label className="ml-2 mb-1" htmlFor="mobileNumber">
            Mobile Number
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="xxx-xxx-xxxx"
          />
        </div>
        <div className="col mb-3">
          <label className="ml-2" htmlFor="reservationDate">
            Date of Reservation
          </label>
          <input className="form-control" type="date" />
          <small className="ml-2">Closed on Tuesday</small>
        </div>
        <div className="col">
          <label className="ml-2" htmlFor="reservationTime">
            Time of Reservation
          </label>
          <input className="form-control" type="time" />
        </div>
      </div>
      <div className="ml-3 mt-3">
        <a className="btn btn-danger border border-dark mr-1" href="/dashboard">
          Cancel
        </a>
        <button
          type="submit"
          className="btn btn-primary border border-dark ml-1"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReservationForm;
