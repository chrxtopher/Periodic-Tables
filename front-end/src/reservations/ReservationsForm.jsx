import React, { useState } from "react";
import { createReservation } from "../utils/api";
import { useHistory } from "react-router-dom";
 
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
 
 ////////////////////
 // HANDLERS BELOW //
 /////////////////////
 
 const handleFirstNameChange = (event) => {
  setNewReservation({ ...newReservation, [event.target.name]: event.target.value});
  console.log(newReservation);
 };

 const handleLastNameChange = (event) => {
  setNewReservation({...newReservation, last_name: event.target.value});
  console.log(newReservation);
 }

 const handleMobileNumberChange = (event) => {
   setNewReservation({...newReservation, mobile_number: event.target.value});
   console.log(newReservation);
 }

 const handleDateChange = (event) => {
   setNewReservation({...newReservation, reservation_date: event.target.value})
   console.log(newReservation);
 }

 const handleTimeChange = (event) => {
   setNewReservation({...newReservation, reservation_time: event.target.value})
   console.log(newReservation);
 }

 const handlePartyChange = (event) => {
   setNewReservation({...newReservation, people: event.target.value})
   console.log(newReservation);
 }
 
 const handleSubmit = async (event) => {
   event.preventDefault();
   const abortController = new AbortController();
   try {
     await createReservation(newReservation, abortController.signal);
     setNewReservation({...emptyReservationForm})
     history.push("/");
   } catch (error) {
     console.log(error);
   }

   return () => abortController.abort();
 };


 
 return (
   <>
     <h1 className="display-4 text-center mt-3">Create a Reservation</h1>
    <form onSubmit={handleSubmit} className="m-5">
      <div>
        <div className="row">
          <div className="col mb-3">
            <label className="ml-2 mb-1" htmlFor="firstName">
              First Name
            </label>
            <input
              name="first_name"
              onChange={handleFirstNameChange}
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
              onChange={handleLastNameChange} 
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
              onChange={handleMobileNumberChange}
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
            onChange={handlePartyChange} 
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
              onChange={handleDateChange} 
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
              onChange={handleTimeChange} 
              required
            />
          </div>
        </div>
        
      </div>
      <div className="d-flex ml-3 mt-4 justify-content-center">
        <a className="btn btn-danger btn-lg border border-dark mr-1" href="/">
          Cancel
        </a>
        <button
          type="submit"
          className="btn btn-primary btn-lg border border-dark ml-1"
        >
          Submit
        </button>
      </div>
    </form>
   </>
 );
}
 
export default ReservationForm;
