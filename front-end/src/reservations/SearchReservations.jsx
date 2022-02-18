import React from "react";

function SearchReservations({ mobile_number }) {

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div>
      <h1 className="text-center display-4 mt-3">Search for a Reservation</h1>
        <form onSubmit={handleSubmit} className="m-5">
          <label className="m-2">Mobile Number</label>
          <div className="d-flex">
            <input 
              name="mobile_number" 
              className="form-control shadow" 
              type="text" 
              placeholder="Enter a customer's phone number" 
              required
            />
            <button className="btn btn-primary border border-dark mx-2 shadow">Search</button>
          </div>
        </form>
    </div>
  )
}

export default SearchReservations;