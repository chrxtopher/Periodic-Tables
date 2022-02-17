import React, { useState, useEffect } from "react";
import { listTables } from "../utils/api";
import { useHistory } from "react-router";

function SeatReservation() {
  const history = useHistory();
  const [tables, setTables] = useState([]);
  
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
      <option>Table: {table.table_name} - Capacity: {table.capacity}</option>
    )
  });

  return (
    <>
      <h1 className="display-4 text-center mt-3 mb-5">Seat a Reservation</h1>
      <div>
        <form>
          <label>Table number</label>
          <select className="form-select">
            <option selected>Select a table</option>
            {options}
          </select>
          <div>
            <button 
              onClick={() => history.goBack()} 
              className="btn btn-lg btn-danger border border-dark mx-2 shadow">
                Cancel
            </button>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}


export default SeatReservation;