import React, { useState } from "react";
import { createReservation } from "../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
 
const emptyReservationForm = {
  first_name: "",
  last_name: "",
  mobile_number: "",
  reservation_date: "",
  reservation_time: "",
  people: "",
}
 
function ReservationForm() {
 const history = useHistory();
 const [newReservation, setNewReservation] = useState({});
 const [error, setError] = useState(null);
 
 ////////////////////
 // HANDLERS BELOW //
 /////////////////////

 const handleChange = (event) => {
   setNewReservation({...newReservation, [event.target.name]: event.target.value});
 }
 
 const handleSubmit = async (event) => {
   event.preventDefault();
   const abortController = new AbortController();
   try {
     await createReservation(newReservation, abortController.signal);
     setNewReservation({...emptyReservationForm});
     history.push(`/dashboard?date=${newReservation.reservation_date}`);
   } catch (error) {
     setError(error);
   }
   return () => abortController.abort();
 };


 
 return (
   <>
     <h1 className="display-4 text-center mt-3">Create a Reservation</h1>
     <ErrorAlert error={error}/>
    <form onSubmit={handleSubmit} className="m-5">
      <div>
        <div className="row">
          <div className="col mb-3">
            <label className="ml-2 mb-1" htmlFor="firstName">
              First Name
            </label>
            <input
              name="first_name"
              onChange={handleChange}
              className="form-control shadow"
              type="text"
              placeholder="First Name"
              required
            />
          </div>
          <div className="col mb-3">
            <label className="ml-2 mb-1" htmlFor="lastName">
              Last Name
            </label>
            <input 
              name="last_name"
              onChange={handleChange} 
              className="form-control shadow" 
              type="text" 
              placeholder="Last Name" 
              required 
            />
          </div>
        </div>
        <div className="row">
          <div className="col mb-3">
            <label className="ml-2 mb-1" htmlFor="mobileNumber">
              Mobile Number
            </label>
            <input
              name="mobile_number"
              onChange={handleChange}
              className="form-control shadow"
              type="text"
              placeholder="xxx-xxx-xxxx"
              required
            />
          </div>
          <div className="col mb-3">
          <label className="ml-2" htmlFor="partySize">Party Size</label>
          <input 
            name="people"
            className="form-control shadow" 
            type="number" 
            min={1} 
            placeholder="1" 
            onChange={handleChange} 
            required 
          />
        </div>
        </div>
        <div className="row">
          <div className="col mb-3">
            <label className="ml-2" htmlFor="reservationDate">
              Date of Reservation
            </label>
            <input 
              name="reservation_date"
              className="form-control shadow" 
              type="date" 
              onChange={handleChange} 
              required
            />
            <small className="ml-2">Closed on Tuesday</small>
          </div>
          <div className="col mb-3">
            <label className="ml-2" htmlFor="reservationTime">
              Time of Reservation
            </label>
            <input 
              name="reservation_time"
              className="form-control shadow" 
              type="time" 
              onChange={handleChange} 
              required
            />
          </div>
        </div>
        
      </div>
      <div className="d-flex my-4 justify-content-center">
        <button className="btn btn-danger btn-lg border border-dark mx-2 shadow" onClick={() => history.goBack()}>
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary btn-lg border border-dark mx-2 shadow"
        >
          Submit
        </button>
      </div>
    </form>
   </>
 );
}
 
export default ReservationForm;

