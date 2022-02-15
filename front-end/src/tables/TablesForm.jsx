import React from "react";

const handleSubmit = (event) => {
  event.preventDefault();
}

function CreateTable() {
  return (
    <>
    <h1 className="display-4 text-center mt-3">New Table</h1>
    <form onSubmit={handleSubmit} className="m-5" >
      <div className="row">
        <div className="col mb-3">
          <label className="ml-2 mb-1" htmlFor="tableName">
            Table Name
          </label>
          <input
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
      <a className="btn btn-lg btn-danger border border-dark mx-2 shadow" href="/">Cancel</a>
      <button type="submit" className="btn btn-lg btn-primary border border-dark mx-2 shadow">Submit</button>
      </div>
    </form>
    </>
  )
}

export default CreateTable;