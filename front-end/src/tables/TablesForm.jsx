import React, { useState } from "react";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";

const emptyTableForm = {
  "table_name": "",
  "capacity": ""
}



function CreateTable() {
  const history = useHistory();
  const [newTable, setNewTable] = useState({});
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setNewTable({...newTable, [event.target.name]:event.target.value});
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    history.push("/");
    try {
      await createTable(newTable, abortController.signal);
      setNewTable({...emptyTableForm});
    } catch (error) {
      setError(error);
    }
  }


  return (
    <>
    <h1 className="display-4 text-center mt-3">New Table</h1>
    <ErrorAlert error={error}/>
    <form onSubmit={handleSubmit} className="m-5" >
      <div className="row">
        <div className="col mb-3">
          <label className="ml-2 mb-1" htmlFor="tableName">
            Table Name
          </label>
          <input
            onChange={handleChange}
            name="table_name"
            className="form-control shadow"
            type="text"
            placeholder="Table Name"
            required
          />
        </div>
        <div className="col mb-3">
          <label className="ml-2 mb-1" htmlFor="capacity">
            Capacity
          </label>
          <input
            onChange={handleChange}
            name="capacity"
            className="form-control shadow" 
            type="number" 
            min={1}
            placeholder="1" 
            required 
          />
        </div>
      </div>
      <div className="d-flex justify-content-center my-5">
      <button onClick={() => history.goBack()} className="btn btn-lg btn-danger border border-dark mx-2 shadow">Cancel</button>
      <button type="submit" className="btn btn-lg btn-primary border border-dark mx-2 shadow">Submit</button>
      </div>
    </form>
    </>
  )
}

export default CreateTable;