import React, { useState, useEffect } from "react";
import {
  createReservation,
  readReservation,
  updateReservation,
} from "../utils/api";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
const emptyReservationForm = {
  first_name: "",
  last_name: "",
  mobile_number: "",
  reservation_date: "",
  reservation_time: "",
  people: "",
};

function ReservationForm() {
  const history = useHistory();
  const [newReservation, setNewReservation] = useState({
    ...emptyReservationForm,
  });
  const [error, setError] = useState(null);
  const { reservation_id } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    async function checkForReservation() {
      try {
        if (reservation_id) {
          const data = await readReservation(
            reservation_id,
            abortController.signal
          );
          setNewReservation(data);
        } else {
          setNewReservation({ ...emptyReservationForm });
        }
      } catch (error) {
        setError(error);
      }
    }
    checkForReservation();

    return () => abortController.abort();
  }, [reservation_id]);

  ////////////////////
  // HANDLERS BELOW //
  /////////////////////

  const handleChange = (event) => {
    setNewReservation({
      ...newReservation,
      [event.target.name]: event.target.value,
    });
  };

  const handlePeopleChange = (event) => {
    setNewReservation({
      ...newReservation,
      [event.target.name]: Number(event.target.value),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      if (reservation_id) {
        await updateReservation(newReservation, abortController.signal);
        history.push(`/dashboard?date=${newReservation.reservation_date}`);
        setNewReservation({ ...emptyReservationForm });
      } else {
        await createReservation(newReservation, abortController.signal);
        history.push(`/dashboard?date=${newReservation.reservation_date}`);
        setNewReservation({ ...emptyReservationForm });
      }
    } catch (error) {
      setError(error);
    }
    return () => abortController.abort();
  };

  return (
    <>
      <h1 className="display-4 text-center mt-3">Reservation Form</h1>
      <ErrorAlert error={error} />
      <form onSubmit={handleSubmit} className="m-5">
        <div>
          <div className="row mb-3">
            <div className="col mb-3">
              <label className="ml-2 mb-1" htmlFor="firstName">
                First Name
              </label>
              <input
                name="first_name"
                onChange={handleChange}
                className="form-control shadow"
                type="text"
                value={newReservation.first_name}
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
                value={newReservation.last_name}
                placeholder="Last Name"
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col mb-3">
              <label className="ml-2 mb-1" htmlFor="mobileNumber">
                Mobile Number
              </label>
              <input
                name="mobile_number"
                onChange={handleChange}
                className="form-control shadow"
                type="text"
                value={newReservation.mobile_number}
                placeholder="xxx-xxx-xxxx"
                required
              />
            </div>
            <div className="col mb-3">
              <label className="ml-2" htmlFor="partySize">
                Party Size
              </label>
              <input
                name="people"
                onChange={handlePeopleChange}
                className="form-control shadow"
                type="number"
                min={1}
                value={newReservation.people}
                placeholder="1"
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col mb-3">
              <label className="ml-2" htmlFor="reservationDate">
                Date of Reservation
              </label>
              <input
                name="reservation_date"
                onChange={handleChange}
                className="form-control shadow"
                type="date"
                value={newReservation.reservation_date}
                required
              />
              <small className="m-2">Closed on Tuesday</small>
            </div>
            <div className="col mb-3">
              <label className="ml-2" htmlFor="reservationTime">
                Time of Reservation
              </label>
              <input
                name="reservation_time"
                onChange={handleChange}
                className="form-control shadow"
                type="time"
                value={newReservation.reservation_time}
                required
              />
              <small className="m-2">Between 10:30 AM - 9:30 PM</small>
            </div>
          </div>
        </div>
        <div className="d-flex my-4 justify-content-center">
          <button
            className="btn btn-danger btn-lg border border-dark mx-2 shadow"
            onClick={() => history.goBack()}
          >
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
