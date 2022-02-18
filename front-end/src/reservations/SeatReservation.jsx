import React, { useState, useEffect } from "react";
import { listTables } from "../utils/api";
import { useHistory } from "react-router";
import { seatReservation } from "../utils/api";

function SeatReservation() {
  const history = useHistory();
  const [tables, setTables] = useState([]);
  const [table, setTable] = useState(null);
  
  useEffect(() => {
    async function loadTables() {
      const abortController = new AbortController();
      const tables = await listTables(abortController.signal);
      setTables(tables);
    }
    loadTables();
  }, []);

  const options = tables.map((table) => {
    return (
      <option value={table.table_id} key={table.table_id}>Table: {table.table_name} - Capacity: {table.capacity}</option>
    )
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(table);
  }

  const handleChange = (event) => {
    setTable({ [event.target.name]: event.target.value })
  }

  return (
    <>
      <h1 className="display-4 text-center mt-3 mb-5">Seat a Reservation</h1>
      <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
          <label>Table number</label>
          <select required onChange={handleChange} name="table_id" className="form-select">
            <option value={"Select a Table"} key={0}>Select a table</option>
            {options}
          </select>
          <div className="d-flex justify-content-center my-5">
            <button 
              onClick={() => history.goBack()} 
              className="btn btn-lg btn-danger border border-dark mx-2 shadow">
                Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-lg btn-primary border border-dark mx-2 shadow">
                Submit
            </button>
          </div>
        </form>
      </div>
    </>
  )
}


export default SeatReservation;