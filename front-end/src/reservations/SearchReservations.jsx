import React from "react";

function SearchReservations({ mobile_number }) {
  return (
    <div>
      <form>
        <label>Mobile Number</label>
        <input 
          name="mobile_number" 
          className="form-control shadow" 
          type="text" 
          placeholder="Enter a customer's phone number" 
          required
        />
      </form>
    </div>
  )
}

export default SearchReservations;