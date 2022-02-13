import React from "react";

function CreateTable() {
  return (
    <>
    <h1 className="display-4 text-center">New Table</h1>
    <form>
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
      <button>Cancel</button>
      <button>Submit</button>
    </form>
    </>
  )
}

export default CreateTable;