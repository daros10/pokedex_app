import React from "react";
import { Main } from "./container/Main";
import { connect } from "react-redux";

function App() {
  return <Main />;
}

export default connect()(App);
