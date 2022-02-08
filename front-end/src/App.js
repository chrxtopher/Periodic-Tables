import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./layout/Layout";
import ReservationForm from "./reservations/CreateReservation";

/**
 * Defines the root application component.
 * @returns {JSX.Element}
 */
function App() {
  return (
    <Switch>
      <Route exact path="/dashboard">
        <Layout />
      </Route>
      <Route exact path="/reservations/new">
        <ReservationForm />
      </Route>
    </Switch>
  );
}

export default App;
